import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, Send, Minimize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Global declaration for Speech Recognition API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const Chatbot: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I am AgriBot. How can I assist you with your farming and agricultural questions today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Voice State
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const recognitionRef = useRef<any>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Setup Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech Recognition Error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Update Speech Recognition Language when App Language Changes
    useEffect(() => {
        if (recognitionRef.current) {
            let langCode = 'en-US';
            if (i18n.language === 'hi') langCode = 'hi-IN';
            if (i18n.language === 'te') langCode = 'te-IN';
            if (i18n.language === 'ta') langCode = 'ta-IN';
            recognitionRef.current.lang = langCode;
        }
    }, [i18n.language]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                console.error("Could not start speech recognition", e);
            }
        }
    };

    // Text to Speech Function
    const speakText = (text: string) => {
        if (isMuted || !('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        let langCode = 'en-US';
        if (i18n.language === 'hi') langCode = 'hi-IN';
        if (i18n.language === 'te') langCode = 'te-IN';
        if (i18n.language === 'ta') langCode = 'ta-IN';
        utterance.lang = langCode;

        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input.trim() };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Send the entire conversation history to maintain context
            const res = await axios.post('http://localhost:5000/api/chat', {
                messages: newMessages,
                language: i18n.language // Pass current language to backend
            });

            const replyText = res.data.reply;
            setMessages([...newMessages, { role: 'assistant', content: replyText }]);

            // Speak the response
            speakText(replyText);

        } catch (error) {
            console.error('Chat API Error:', error);
            const errReply = "I'm having trouble connecting to my agricultural database right now. Please try again later.";
            setMessages([...newMessages, { role: 'assistant', content: errReply }]);
            speakText(errReply);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chatbot Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    aria-label="Open Chat"
                >
                    <MessageSquare size={28} />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-80 sm:w-96 max-h-[500px] h-[70vh] border border-gray-100 overflow-hidden transform transition-all duration-300 origin-bottom-right">

                    {/* Header */}
                    <div className="bg-green-600 text-white p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={20} />
                            <h3 className="font-semibold text-lg">AgriBot AI</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => {
                                    setIsMuted(!isMuted);
                                    window.speechSynthesis.cancel();
                                }}
                                className="hover:bg-green-700 p-1.5 rounded transition-colors text-white/80 hover:text-white"
                                title={isMuted ? "Unmute Voice" : "Mute Voice"}
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1.5 rounded transition-colors text-white/80 hover:text-white" title="Minimize">
                                <Minimize2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm text-sm ${msg.role === 'user'
                                    ? 'bg-green-600 text-white rounded-tr-sm'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all overflow-hidden">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about farming..."
                                className="flex-1 bg-transparent border-none py-3 px-4 text-sm focus:outline-none focus:ring-0 w-full"
                                disabled={isLoading}
                            />

                            {/* Voice Input Button */}
                            {('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) && (
                                <button
                                    type="button"
                                    onClick={toggleListening}
                                    className={`p-2 rounded-full transition-colors ${isListening
                                            ? 'text-red-500 bg-red-50 animate-pulse'
                                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                    title="Voice Input"
                                >
                                    {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-2 mr-1 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

# Weather API - UML Diagrams

This document contains Mermaid UML diagrams detailing the structure and flow of the Weather API feature in the Agriwaste application.

## 1. Sequence Diagram
Illustrates how the frontend (React), backend (Express), database (MongoDB), and OpenWeather API communicate to fulfill a user's weather request.

```mermaid
sequenceDiagram
    participant User as User
    participant Frontend as React App (WeatherAdvisory/Recommendations)
    participant Backend as Express Server
    participant DB as MongoDB
    participant OpenWeather as OpenWeather API
    participant GroqAI as Groq AI

    User->>Frontend: Enters Location (Weather Search)
    Frontend->>Backend: GET /api/weather/{location}
    Backend->>DB: Check Cache
    DB-->>Backend: Returns Cache Data
    
    Backend->>OpenWeather: Request Live Weather Data
    OpenWeather-->>Backend: Weather Data
    Backend-->>Frontend: Return Weather & Basic Advisory

    User->>Frontend: Submits Inputs (Soil, Location, Waste, Sunlight)
    Frontend->>Backend: POST /api/recommendations
    Backend->>GroqAI: Fetch Crop Recommendations
    GroqAI-->>Backend: Returns AI Suggestions
    Backend->>DB: Save Recommendation History
    Backend-->>Frontend: Return Crop Suggestions (Groq AI)
    Frontend-->>User: Display AI Suggested Crops
```

## 2. Activity Diagram (Flowchart)
Details the backend internal logic residing in `weather.js` that dictates when to use the cache or external API.

```mermaid
flowchart TD
    Start([Start]) --> A[Receive GET Request for Location]
    A --> B{Is Location in Cache?}
    
    B -- Yes --> C{"Is Cache Fresh? <br/>(< 30 mins old)"}
    B -- No --> D{API Key Present?}
    
    C -- Yes --> E[Return Cached Data]
    C -- No --> D
    
    D -- No --> F[Log Warning & Return Mock Data]
    D -- Yes --> G[Fetch from OpenWeather API]
    
    G --> H{Fetch Successful?}
    
    H -- Yes --> I[Add Agricultural Advisory Logic]
    H -- No --> J[Catch Error, Log it, Return 500 Status]
    
    I --> K{Did Cache Exist previously?}
    
    K -- Yes --> L[Update Existing Cache Entry in DB]
    K -- No --> M[Create New Cache Entry in DB]
    
    L --> N[Return API Data to Client]
    M --> N
    
    E --> End([End])
    F --> End
    N --> End
    J --> End
```

## 3. Class Diagram / Data Model
Shows the Object-Oriented/Document structure used for caching data and the TypeScript interfaces used on the frontend.

```mermaid
classDiagram
    class WeatherCache {
        <<Mongoose Schema>>
        +String location
        +Object data
        +Date lastUpdated
    }

    class WeatherData {
        <<TypeScript Interface>>
        +String name
        +Main main
        +Weather[] weather
        +String advise
    }
    
    class Main {
        +Number temp
    }
    
    class Weather {
        +String icon
        +String description
    }

    WeatherData *-- Main
    WeatherData *-- Weather
    WeatherCache o-- WeatherData : Caches
```

## 4. Component / Architecture Diagram
Represents the structural breakdown of the systems involved in the weather advisory feature.

```mermaid
flowchart TB
    subgraph Frontend ["Frontend (Web)"]
        ReactApp["React SPA"]
    end

    subgraph Backend ["Backend Server"]
        ExpressRouter["Express API Routings"]
        AIController["AI Controller (Groq Service)"]
        WeatherController["Weather Controller"]
    end

    subgraph DB ["Database"]
        MongoDB["MongoDB (Cache + History)"]
    end

    subgraph External ["External Services"]
        OpenWeatherAPI["OpenWeather API"]
        GroqAPI["Groq AI Model"]
    end

    ReactApp <-->|HTTP GET/POST| ExpressRouter
    ExpressRouter --> AIController
    ExpressRouter --> WeatherController
    
    AIController <-->|Groq SDK| GroqAPI
    WeatherController <-->|Axios GET| OpenWeatherAPI
    
    AIController <-->|Mongoose queries| MongoDB
    WeatherController <-->|Mongoose queries| MongoDB
```

## 5. State Diagram
Represents the state array of the UI Component (`WeatherAdvisory.tsx`) as the user interacts with the app.

```mermaid
stateDiagram-v2
    [*] --> Idle : Component Mounts
    
    Idle --> Loading : User submits location
    
    Loading --> Error : API call fails (Try-Catch block catches)
    Loading --> Success : API returns 200 OK
    
    Error --> Loading : User submits again
    Success --> Loading : User submits new location
    
    Success --> [*] : Component Unmounts
    Error --> [*] : Component Unmounts
    Idle --> [*] : Component Unmounts

    state Success {
        [*] --> RenderingData
        RenderingData --> DisplayingWeather
        RenderingData --> DisplayingAdvisory
    }
```

## 6. Use Case Diagram
Highlights user interactions and system boundary.

```mermaid
flowchart LR
    subgraph Actors
        Farmer(("User/Farmer"))
        OpenWeather(("OpenWeather System"))
        Mongo(("Database System"))
        Groq(("Groq AI Model"))
    end

    subgraph Weather & AI Advisory System
        UC1(["Input Location"])
        UC2(["View Current Weather"])
        UC3(["Read Basic Farming Advisory"])
        
        UC6(["Submit Farm Details (Soil/Waste/Sun)"])
        UC7(["Receive 'Crop to Grow' AI Suggestion"])
        UC8(["Save Recommendation History"])
    end

    Farmer --> UC1
    Farmer --> UC2
    Farmer --> UC6
    Farmer --> UC7

    UC1 -.->|includes| UC2
    UC2 -.->|includes| UC3
    UC2 --> OpenWeather

    UC6 -.->|triggers| UC7
    UC7 --> Groq
    UC7 -.->|includes| UC8
    UC8 --> Mongo
```

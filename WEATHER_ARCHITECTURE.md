# Weather API - UML Diagrams

This document contains Mermaid UML diagrams detailing the structure and flow of the Weather API feature in the Agriwaste application.

## 1. Sequence Diagram
Illustrates how the frontend (React), backend (Express), database (MongoDB), and OpenWeather API communicate to fulfill a user's weather request.

```mermaid
sequenceDiagram
    participant User as User
    participant Frontend as React App (WeatherAdvisory)
    participant Backend as Express Server (/api/weather)
    participant DB as MongoDB (WeatherCache)
    participant OpenWeather as OpenWeather API

    User->>Frontend: Enters Location & Clicks Search
    Frontend->>Backend: GET /api/weather/{location}
    
    Backend->>DB: Check if location is cached (WeatherCache.findOne)
    DB-->>Backend: Returns cache document (or null)
    
    alt Cache Hit & Fresh ( < 30 mins)
        Backend-->>Frontend: Return cached data {source: "cache"}
    else Cache Miss or Stale
        Backend->>OpenWeather: Request weather data
        
        alt API Key Missing
            Backend-->>Frontend: Return mock data {source: "mock"}
        else OpenWeather Request Success
            OpenWeather-->>Backend: Returns weather data
            
            Backend->>Backend: Calculate advisory logic
            
            alt Cache Exists (Stale)
                Backend->>DB: Update existing cache
            else Cache Does Not Exist
                Backend->>DB: Create new cache entry
            end
            
            Backend-->>Frontend: Return API data and advisory {source: "api"}
        else OpenWeather Request Failed
            OpenWeather--xBackend: Return 4xx/5xx Error
            Backend-->>Frontend: Return 500 Error message
        end
    end
    
    Frontend-->>User: Display Weather Data & Advisory
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
        ReactApp["React SPA (WeatherAdvisory)"]
    end

    subgraph Backend ["Backend Server"]
        ExpressRouter["Express Router (/api/weather)"]
    end

    subgraph DB ["Database"]
        MongoDB["MongoDB (WeatherCache)"]
    end

    subgraph External ["External Services"]
        OpenWeatherAPI["OpenWeather API"]
    end

    ReactApp <-->|HTTP GET| ExpressRouter
    ExpressRouter <-->|Mongoose queries| MongoDB
    ExpressRouter <-->|Axios GET| OpenWeatherAPI
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
    end

    subgraph Weather Advisory System
        UC1(["Input Location"])
        UC2(["View Current Weather"])
        UC3(["Read Farming Advisory"])
        UC4(["Validate Cache"])
        UC5(["Fetch Live Data"])
    end

    Farmer --> UC1
    Farmer --> UC2
    Farmer --> UC3

    UC1 -.->|includes| UC2
    UC2 -.->|includes| UC3

    UC2 -.->|include| UC4
    UC4 --> Mongo

    UC4 -.->|extends (if cache miss)| UC5
    UC5 --> OpenWeather
```

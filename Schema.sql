-- PostgreSQL Schema
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE clothing_items (
    item_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    brand VARCHAR(100),
    model VARCHAR(100),
    color VARCHAR(50),
    style VARCHAR(50),
    image_url VARCHAR(512),
    processed_image_url VARCHAR(512),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE outfits (
    outfit_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    items JSONB, -- Array of item IDs
    rating INTEGER,
    weather_condition VARCHAR(50),
    occasion VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
    recommendation_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    item_id VARCHAR(255),
    source VARCHAR(50), -- 'personal' or 'trending'
    confidence FLOAT,
    viewed BOOLEAN DEFAULT FALSE,
    purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

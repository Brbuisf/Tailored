CREATE TABLE outfits (
    outfit_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    items UUID[] NOT NULL, -- Array of item_ids
    weather_condition VARCHAR(50),
    occasion VARCHAR(50),
    rating FLOAT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

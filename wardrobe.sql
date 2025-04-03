CREATE TABLE wardrobe (
    item_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    brand VARCHAR(100),
    model VARCHAR(100),
    color_hex VARCHAR(7),
    style VARCHAR(50),
    image_url VARCHAR(512),
    processed_image_url VARCHAR(512),
    metadata JSONB NOT NULL DEFAULT '{}',
    last_worn_date DATE,
    times_worn INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

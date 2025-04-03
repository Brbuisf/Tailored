import tensorflow as tf
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.applications import EfficientNetB4

class ClothingClassifier:
    def __init__(self):
        self.model = self.build_model()
    
    def build_model(self):
        base = EfficientNetB4(weights=None, include_top=False)
        
        # Multi-head output
        x = GlobalAveragePooling2D()(base.output)
        
        # Category (e.g., t-shirt, dress)
        category_out = Dense(20, activation='softmax', name='category')(x)
        
        # Style (casual, formal)
        style_out = Dense(10, activation='softmax', name='style')(x)
        
        # Color (RGB prediction)
        color_out = Dense(3, activation='sigmoid', name='color')(x)
        
        return tf.keras.Model(inputs=base.input, outputs=[category_out, style_out, color_out])

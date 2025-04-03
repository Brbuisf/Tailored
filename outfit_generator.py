# outfit_generator.py
import random
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class ClothingItem:
    id: str
    category: str
    style: str
    color: str
    brand: str
    image_url: str

class OutfitGenerator:
    def __init__(self, wardrobe: List[ClothingItem]):
        self.wardrobe = wardrobe
        self.style_rules = self.load_style_rules()
        self.color_palettes = self.load_color_palettes()
    
    def generate_outfit(self, weather: str, occasion: str) -> Dict:
        """Generate a complete outfit based on rules and preferences"""
        outfit = {
            'top': self.select_item('top', weather, occasion),
            'bottom': self.select_item('bottom', weather, occasion),
            'shoes': self.select_item('shoes', weather, occasion),
            'accessories': self.select_accessories(weather, occasion),
            'rating': 0
        }
        
        # Ensure color coordination
        self.adjust_colors(outfit)
        
        return outfit
    
    def select_item(self, category: str, weather: str, occasion: str) -> ClothingItem:
        """Select an item based on category and constraints"""
        candidates = [
            item for item in self.wardrobe 
            if item.category == category
            and self.is_weather_appropriate(item, weather)
            and self.is_occasion_appropriate(item, occasion)
        ]
        
        if not candidates:
            return None
            
        # Use weighted random selection based on previous ratings
        return random.choices(
            candidates,
            weights=[item.preference_score for item in candidates],
            k=1
        )[0]
    
    def adjust_colors(self, outfit: Dict):
        """Ensure color coordination between outfit items"""
        base_color = outfit['top'].color
        palette = self.color_palettes.get(base_color, [base_color])
        
        for item in ['bottom', 'shoes']:
            if outfit[item] and outfit[item].color not in palette:
                # Find a similar item with a matching color
                matching_items = [
                    i for i in self.wardrobe 
                    if i.category == outfit[item].category
                    and i.color in palette
                ]
                if matching_items:
                    outfit[item] = random.choice(matching_items)

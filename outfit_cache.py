import redis
from datetime import timedelta

r = redis.Redis()

def cache_outfits(user_id, outfits):
    r.setex(f"outfits:{user_id}", timedelta(minutes=10), json.dumps(outfits))

def get_cached_outfits(user_id):
    cached = r.get(f"outfits:{user_id}")
    return json.loads(cached) if cached else None

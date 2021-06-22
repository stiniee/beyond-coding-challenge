"""
A script to generate the static data for the calendar.
"""
import json
import random

output = {"days": []}

for day in range(0, 365):
    rate = random.randint(60, 400)
    seasonal = random.randint(60, rate)
    day_of_the_week = rate - seasonal

    output["days"].append({
      "dateOffset": day,
      "rate": {"total": rate, "seasonal": seasonal, "DOW": day_of_the_week},
      "isBlocked": random.randint(0, 100) < 5
    })

print(json.dumps(output, indent=2))

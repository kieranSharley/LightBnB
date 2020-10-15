

SELECT properties.*, reservations.*, AVG(property_reviews.rating)
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 5 AND reservations.end_date < now()::date

GROUP BY reservations.id, properties.id

ORDER BY reservations.start_date
LIMIT 10;

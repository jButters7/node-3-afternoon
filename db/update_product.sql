-- UPDATE product 
-- SET name = $2, description = $3, price = $4, image_url = $5
-- WHERE product_id = $1
-- returning *;

UPDATE product SET description = $2 WHERE product_id = $1;


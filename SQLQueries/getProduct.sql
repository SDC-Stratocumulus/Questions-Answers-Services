SELECT p.id as "product_id",
       q.id as "question_id",
       q.body as "question_body",
       q.date_written as "question_date",
       q.asker_name as "asker_name",
       q.helpful as "question_helpfulness",
       q.reported as "reported",
       a.id as "id",
       a.body as "body",
       a.date_written as "date",
       a.answerer_name as "answerer_name",
       a.helpful as "helpfulness",
       ap.url as "url"
FROM products p
LEFT JOIN questions q 
ON q.product_id = p.id
LEFT JOIN answers a 
ON a.question_id = q.id
LEFT JOIN answers_photos ap 
ON ap.answer_id = a.id
WHERE p.id = 5;


SELECT
    S.id AS slot_id,
    S.startDate,
    S.endDate,
    S.city,
    S.source,
    S.destination,
    S.capacity,
	S.status,
    
    U.fName AS user_name,
    U.lName AS user_last_name,
    U.id AS userId,
    U.email,
    'user' AS user_role,
    
    D.fName AS driver_name,
    D.lName AS driver_last_name,
    D.id AS driverId,
    D.email,
    'driver' AS driver_role 
    
FROM
    slotBooks AS S
JOIN
    Users AS U ON U.id = S.userId
JOIN
    Users AS D ON D.id = S.driverId;

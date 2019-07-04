CREATE TABLE tasks (
    id              INTEGER        PRIMARY KEY AUTOINCREMENT,
    name            VARCHAR (250)  NOT NULL,
    status          INTEGER        CHECK (status IN (0, 1, 2) )
                                   NOT NULL
                                   DEFAULT (0),
    description     VARCHAR (1000),
    completion_date DATE,
    creation_date   DATE           DEFAULT (CURRENT_TIMESTAMP)
                                   NOT NULL
);

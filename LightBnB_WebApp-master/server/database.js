const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`SELECT *
 FROM users
 WHERE users.email = $1;`,
    [email])
    .then(res =>
      res.rows[0]);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(`SELECT *
    FROM users
    WHERE users.id = $1;`,
    [id])
    .then(res =>
      res.rows[0]);
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) 
  RETURNING *`,
    [user.name, user.email, user.password])
    .then(res =>
      res.rows);
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 30) {
  return pool.query(
    `SELECT properties.*, reservations.*, AVG(property_reviews.rating)
    FROM reservations
    JOIN properties ON property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2
   
    `, [guest_id, limit])
    .then(res => res.rows);
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// object to hold them all = 
// {
//   city,
//   owner_id,
//   minimum_price_per_night,
//   maximum_price_per_night,
//   minimum_rating
// }


const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
    WHERE 1 = 1
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
if (options.owner_id) {

  queryParams.push(`%${options.city}%`);
  queryString += `properties.owner_id = $${queryParams.length};`
  return pool.query(queryString, queryParams)
      .then(res => res.rows)

}
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += ` AND rating > $${queryParams.length}`;
  }
  
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    queryString += ` AND cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    queryString += ` AND cost_per_night < $${queryParams.length}`;
  }
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  //5
  //6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const Add_Property_Query =
`INSERT INTO properties 
(
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  street,
  city,
  province,
  post_code,
  country,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms
  )
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;

const addProperty = function(property) {
  
  return pool
    .query(Add_Property_Query,
      [
        property.owner_id,
        property.title,
        property.description,
        property.thumbnail_photo_url,
        property.cover_photo_url,
        property.cost_per_night * 100,
        property.street,
        property.city,
        property.province,
        property.post_code,
        property.country,
        property.parking_spaces,
        property.number_of_bathrooms,
        property.number_of_bedrooms
      ])
    .then(res => res.rows[0])
    .catch(err => null);

};
exports.addProperty = addProperty;

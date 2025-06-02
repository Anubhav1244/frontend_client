/**
 * APIs for the application.
 * Export all API endpoint URLs and functions here.
 */
const API_BASE_URL = 'https://backend-internship-zojh.onrender.com/api/v1';

// Example API endpoints
export const LOGIN = `${API_BASE_URL}/auth/login`;
export const SIGNUP = `${API_BASE_URL}/auth/signup`;
export const GETCAHRGER = `${API_BASE_URL}/chargers/`;
export const DELETECHARGER = `${API_BASE_URL}/chargers/delete-charger`;
export const UPDATECHARGER = `${API_BASE_URL}/chargers/update-charger`;
export const ADDCHARGER = `${API_BASE_URL}/chargers/create-charger`;


// Example API call functions (using fetch)

export default {
    LOGIN,
    SIGNUP,
    GETCAHRGER,
    UPDATECHARGER,
    ADDCHARGER,
    DELETECHARGER 
};
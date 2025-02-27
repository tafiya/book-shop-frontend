# Readscape

## Book Shop Application
The **Book Shop Application** is a full-stack web application designed to provide a user-friendly shopping experience. It includes secure authentication, smooth product management, and an intuitive user interface. The platform is fully responsive, error-free, and visually appealing.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux Toolkit
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** SurjoPay

###  User Registration & Authentication (Role-Based)
#### Secure Registration and Login
- Users can register with **name, address, phone no, picture email, and password**.
- Default role: `user`. Admins need to be manually updated.
- Passwords are securely **hashed** before storing.
- Users can log in using **email and password**.

#### JWT Authentication
- JWT token is generated upon login for secure authentication.
- Token is stored in **local storage** to maintain user sessions.

#### Logout
- Clears the token from local storage and redirects users to the login page.

#### Home Page
- **Navbar:** Logo, favicon, navigation items, and buttons for login/signup.
- **Banner:** Showcases platform highlights or special offers.
- **Featured Products:** Displays up to **6 products** with a "View All" button.
- **Extra Section:** Includes **testimonials or blogs**.
- **Footer:** Contains links, social media icons, and contact details.

#### All Products Page
- **Search Functionality:** Search by **title, author, or category**.
- **Filters:** Filter by **price range, author, category, and availability**.
- **Dynamic Results:** Updates based on **search terms** or selected filters.
- **Product Cards:** Displays **name, author, price, and category**.
- **View Details Button:** Redirects to **Product Details Page**.

#### Product Details Page
- Displays the **product image** and **detailed information**.
- The "Buy Now" button redirects to **Checkout Page**.

#### About Page
- Informative page about the **book shop and its mission**.
#### Contact Page
- You can contact us using the contact form.   

#### Checkout Page
- Users can **place orders** for products.
- Ensures **stock validation** before processing an order.
- **Order Form:** Includes product details, user details, total price calculation, and payment method.
- **Payment Integration:** Uses **SurjoPay** as the payment gateway.
- **Order Now Button:** Confirms the purchase.
  
**Admin Dashboard:**
- **Manage Users**: Deactivate accounts.
- **Manage Products**: Create, Read, Update, Delete (CRUD operations).
- **Manage Orders**: CRUD operations.

**User Dashboard:**
- View **orders**.
- Manage **profile settings**.
- Update **password** (requires the current password for security).

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/bookshop.git
   cd bookshop
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SURJOPAY_KEY=your_surjopay_key
   ```
4. **Run the backend server:**
   ```sh
   npm run server
   ```
5. **Run the frontend:**
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch product details
- `POST /api/products` - Add a new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Place an order
- `GET /api/orders` - View orders (Admin/User)
- `PUT /api/orders/:id` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Cancel order## Video Explanation
  
## Provide a link to a video explaining the API design and functionality:  
Part-1:[Video Link](https://www.loom.com/share/5214f56b3b1142a09fdf8ea881a77462?sid=960a8e0a-53b3-4277-b103-f2773fbb5bb0)
Part-2:[Video Link](https://www.loom.com/share/eee6700c80794e1b851692b1ed94901a?sid=0adc7164-7d5c-4aa9-9ff0-c6b1e3c49db7)

## Live Link
Provide the link to the live deployed application:  
 [Live Link](https://book-shop-frontend-project.vercel.app/)
## server-side GitHub Link
   [Live Link](https://github.com/tafiya/book-shop-server)

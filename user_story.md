User Story
==========
1. User enters URL:
	1.  http://pinspace.com/ into browser
2. DNS Lookup:
	1. Browser performs DNS lookup to get IP address for http://pinspace.com
    2. DNS server returns IP address
3. Browser sends HTTP request to server:
    1. Browser sends HTTP GET request to server at IP address at root path `"/"`
4. Server passes req to Flask app:
5. Flask Route Handling:
    1. Flask app has a route handler for `"/"` in __init__.py file:
    ```python
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def react_root(path):
        if path == "favicon.ico":
            return app.send_from_directory("public", "favicon.ico")
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")
    ```
6. Serve `index.html`:
    1. The `react_root` function serves the `index.html` file from the `static_folder` directory specified during Flask app initialization. This is built after running `npm run build` in the `react-vite` directory.
        - `app = Flask(__name__, static_folder="../build", static_url_path="/")`
7. Frontend (React) Processing:
    1. The browser receives the `index.html` file and starts parsing it.
    2. The `index.html` includes a `<div id="root"></div>` element where the React app will be rendered.
    3. The `index.html` also includes a `<script>` tag that points to the `main.jsx` file:
    ```html
    <script type="module" src="/src/main.jsx"></script>
    ```
8. React App Initialization:
    1. The `main.jsx` file initializes the React app, sets up the Redux store, and renders the root React component inside the `root` div.
    ```javascript
        // React app rendered in DOM root from index.html
        ReactDOM.createRoot(document.getElementById("root")).render(
          <React.StrictMode>
            <ReduxProvider store={store}>
              <RouterProvider router={router} />
            </ReduxProvider>
          </React.StrictMode>
        );
    ```
9. React Router Handling:
    1. The RouterProvider uses the router configuration defined in index.jsx to determine which components to render based on the current URL.
```js
// index.jsx
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);

```

-----------------------------------------------------------------------------------------------------------------
They see the generic splash page.
They can log in or sign up
Click log in: 
- login modal pops up
- enter user creds
	- validation: go/nogo
	- Home page (logged in) is user profile, with all boards `/api/`
What happens when the signup?
- click sign up, sign up modal pops up
- validations, F&B
- Home page (logged in) is user profile, with all boards 

From User Home (Boards:
- Click hamburger to logout

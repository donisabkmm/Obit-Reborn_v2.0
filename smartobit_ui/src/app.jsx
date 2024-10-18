import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routesConfig } from './routes/RoutesConfig.jsx'; // Dynamic routes config
import LazyLoader from "./utils/LazyLoader.jsx";

function App() {
    return (
        <Router>
            <Suspense
                fallback={
                        <LazyLoader />
                }
            >
                <Routes>
                    {routesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                            exact={route.exact || false}  // Handle exact routes if needed
                        />
                    ))}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;

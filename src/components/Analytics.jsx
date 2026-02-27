import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function Analytics() {
    const location = useLocation();

    useEffect(() => {
        const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (trackingId) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    return null;
}

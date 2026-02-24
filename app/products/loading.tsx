export default function ProductsLoading() {
    return (
        <div className="route-overlay" aria-hidden="true">
            <div className="route-overlay__spinner">
                <div className="route-overlay__ring" />
            </div>
        </div>
    );
}

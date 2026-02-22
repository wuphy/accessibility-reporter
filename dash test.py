from dash import Dash, html, dcc, Output, Input, State
import dash_leaflet as dl

app = Dash(__name__,title="map", # Tab Title
    update_title="loading...")

app.layout = html.Div(
    [
        html.H1("yo mom"),
        dl.Map(
            [
                dl.TileLayer(),
                # We use a unique ID and explicit list initialization
                dl.LayerGroup(id="marker-layer"),
            ],
            id="map",
            center=[51.5, -0.09],
            zoom=10,
            style={"width": "100%", "height": "70vh"},
        ),
        # DEBUG BOX: This will tell us if the click is even being registered
        html.Div(id="debug-output", style={"padding": "20px", "background": "#eee"}),
    ]
)


@app.callback(
    Output("marker-layer", "children"),
    Output("debug-output", "children"),
    Input(
        "map", "clickData"
    ),  # Using clickData which is more reliable in newer versions
    State("marker-layer", "children"),
)
def add_marker(click_data, existing_children):
    # Initialize list if empty
    if existing_children is None:
        existing_children = []

    # If no click yet, just return what we have
    if not click_data:
        return existing_children, "No click detected yet."

    # Extract coordinates from the clickData dictionary
    # In dash-leaflet, clickData looks like: {"latlng": {"lat": ..., "lng": ...}}
    lat = click_data["latlng"]["lat"]
    lng = click_data["latlng"]["lng"]

    colored_icon = {
        "iconUrl": "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        "shadowUrl": "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "shadowSize": [41, 41],
    }
    # Create the marker object
    new_marker = dl.Marker(
        position=[lat, lng],
        children=[
            dl.Tooltip(f"Issue reported at {round(lat, 3)}, {round(lng, 3)}"),
            dl.Popup("Severity: Medium"),
        ],
        icon=colored_icon,
    )

    # Append to the list
    existing_children.append(new_marker)

    debug_msg = (
        f"Last click at: Lat {lat}, Lng {lng}. Total markers: {len(existing_children)}"
    )

    return existing_children, debug_msg


if __name__ == "__main__":
    app.run(debug=True)

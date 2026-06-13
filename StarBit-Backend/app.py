from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

import os
import qrcode
from dotenv import load_dotenv
from flask import send_file

load_dotenv()

# ------------------------
# MongoDB
# ------------------------

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client["starbit"]

restaurants_collection = db["restaurants"]
orders_collection = db["orders"]

# ------------------------
# App
# ------------------------

app = Flask(__name__)

CORS(app)

# ------------------------
# Home
# ------------------------

@app.route("/")
def home():

    return jsonify({
        "message": "StarBit Backend Running"
    })

# ------------------------
# Super Admin Login
# ------------------------

@app.route(
    "/superadmin/login",
    methods=["POST"]
)
def superadmin_login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    if (
        username == os.getenv(
            "SUPERADMIN_USERNAME"
        )
        and
        password == os.getenv(
            "SUPERADMIN_PASSWORD"
        )
    ):

        return jsonify({
            "success": True,
            "message": "Login Successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid Credentials"
    }), 401

# ------------------------
# Create Restaurant
# ------------------------

@app.route(
    "/restaurants",
    methods=["POST"]
)
def create_restaurant():

    data = request.json

    existing = restaurants_collection.find_one(
        {
            "id": data["id"]
        }
    )

    if existing:

        return jsonify({
            "success": False,
            "message": "Restaurant Already Exists"
        }), 400

    # ------------------------
    # Generate Website QR
    # ------------------------

    qr = qrcode.make(
        data["websiteUrl"]
    )

    qr_filename = (
        f"{data['id']}.png"
    )

    qr_path = (
        f"static/qrs/{qr_filename}"
    )

    qr.save(
        qr_path
    )

    # ------------------------
    # Save QR Path
    # ------------------------

    data["websiteQr"] = (
        f"/static/qrs/{qr_filename}"
    )

    restaurants_collection.insert_one(
        data
    )

    return jsonify({
        "success": True,
        "message": "Restaurant Created",
        "websiteQr":
        data["websiteQr"]
    })

# ------------------------
# Get All Restaurants
# ------------------------

@app.route(
    "/restaurants",
    methods=["GET"]
)
def get_restaurants():

    restaurants = list(
        restaurants_collection.find(
            {},
            {"_id": 0}
        )
    )

    return jsonify(restaurants)

# ------------------------
# Get Restaurant By ID
# ------------------------

@app.route(
    "/restaurants/<restaurant_id>",
    methods=["GET"]
)
def get_restaurant(
    restaurant_id
):

    restaurant = restaurants_collection.find_one(
        {
            "id": restaurant_id
        },
        {
            "_id": 0
        }
    )

    if not restaurant:

        return jsonify({
            "success": False,
            "message": "Restaurant Not Found"
        }), 404

    return jsonify(restaurant)

# ------------------------
# Update Restaurant
# ------------------------

@app.route(
    "/restaurants/<restaurant_id>",
    methods=["PUT"]
)
def update_restaurant(
    restaurant_id
):

    data = request.json

    result = restaurants_collection.update_one(
        {
            "id": restaurant_id
        },
        {
            "$set": data
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "success": False,
            "message": "Restaurant Not Found"
        }), 404

    return jsonify({
        "success": True,
        "message": "Restaurant Updated"
    })

# ------------------------
# Restaurant Login
# ------------------------

@app.route(
    "/restaurant/login",
    methods=["POST"]
)
def restaurant_login():

    data = request.json

    username = data.get(
        "username"
    )

    password = data.get(
        "password"
    )

    restaurant = restaurants_collection.find_one(
        {
            "username": username,
            "password": password
        },
        {
            "_id": 0
        }
    )

    if not restaurant:

        return jsonify({
            "success": False,
            "message": "Invalid Credentials"
        }), 401

    if (
        restaurant["status"]
        != "active"
    ):

        return jsonify({
            "success": False,
            "message": "Account Disabled"
        }), 403

    return jsonify({
        "success": True,
        "restaurantId":
        restaurant["id"],
        "restaurantName":
        restaurant["restaurantName"]
    })

# ------------------------
# Create Order
# ------------------------

@app.route("/orders", methods=["POST"])
def create_order():

    data = request.json

    print("\n========== NEW ORDER ==========")
    print(data)
    print("===============================\n")

    orders_collection.insert_one(data)

    return jsonify({
        "success": True,
        "message": "Order Received",
        "orderId": data.get("orderId")
    })

# ------------------------
# Get All Orders
# ------------------------

@app.route(
    "/orders",
    methods=["GET"]
)
def get_orders():

    orders = list(
        orders_collection.find(
            {},
            {"_id": 0}
        )
    )

    return jsonify(orders)

# ------------------------
# Get Orders By Restaurant
# ------------------------

@app.route(
    "/restaurants/<restaurant_id>/orders",
    methods=["GET"]
)
def get_restaurant_orders(
    restaurant_id
):

    orders = list(
        orders_collection.find(
            {
                "restaurantId":
                restaurant_id
            },
            {
                "_id": 0
            }
        )
    )

    return jsonify(orders)

# ------------------------
# Get Single Order
# ------------------------

@app.route(
    "/order/<order_id>",
    methods=["GET"]
)
def get_order(
    order_id
):

    order = orders_collection.find_one(
        {
            "orderId":
            order_id
        },
        {
            "_id": 0
        }
    )

    if not order:

        return jsonify({
            "success": False,
            "message":
            "Order Not Found"
        }), 404

    return jsonify(order)

# ------------------------
# Update Order
# ------------------------

@app.route(
    "/orders/<order_id>",
    methods=["PUT"]
)
def update_order(
    order_id
):

    data = request.json

    result = orders_collection.update_one(
        {
            "orderId":
            order_id
        },
        {
            "$set": data
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "success": False,
            "message":
            "Order Not Found"
        }), 404

    return jsonify({
        "success": True,
        "message":
        "Order Updated"
    })


# ------------------------
# Restaurant Analytics
# ------------------------

@app.route(
    "/analytics/<restaurant_id>",
    methods=["GET"]
)
def restaurant_analytics(
    restaurant_id
):

    orders = list(
        orders_collection.find(
            {
                "restaurantId":
                restaurant_id
            }
        )
    )

    total_orders = len(
        orders
    )

    pending_orders = 0
    completed_orders = 0
    cancelled_orders = 0
    revenue = 0

    for order in orders:

        status = order.get(
            "status",
            ""
        )

        if status == "pending":
            pending_orders += 1

        elif status == "completed":
            completed_orders += 1

        elif status == "cancelled":
            cancelled_orders += 1

        if status not in [
            "cancelled",
            "rejected"
        ]:
            revenue += (
                order.get(
                    "total",
                    0
                )
            )

    return jsonify({

        "totalOrders":
            total_orders,

        "pendingOrders":
            pending_orders,

        "completedOrders":
            completed_orders,

        "cancelledOrders":
            cancelled_orders,

        "revenue":
            revenue,
    })

# ------------------------
# Run
# ------------------------

@app.route(
    "/download-qr/<restaurant_id>"
)
def download_qr(
    restaurant_id
):

    return send_file(
        f"static/qrs/{restaurant_id}.png",
        as_attachment=True,
        download_name=f"{restaurant_id}-QR.png"
    )

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
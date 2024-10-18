import os

# Define the base directory for the FastAPI microservice
base_dir = "./"

# Define the folder structure as a list of paths
folder_structure = [
    # Main app directory
    os.path.join(base_dir, "app"),
    os.path.join(base_dir, "app/api"),
    os.path.join(base_dir, "app/api/endpoints"),
    os.path.join(base_dir, "app/models"),
    os.path.join(base_dir, "app/schemas"),
    os.path.join(base_dir, "app/services"),
    os.path.join(base_dir, "app/config"),
    os.path.join(base_dir, "app/middlewares"),
    os.path.join(base_dir, "app/tests"),

    # Root files
    base_dir,  # base directory
    os.path.join(base_dir, "README.md"),
]

# Define the files to create with initial content
files_content = {
    os.path.join(base_dir, "app/__init__.py"): "",
    os.path.join(base_dir, "app/main.py"): "# Entry point of the FastAPI application\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get(\"/\")\nasync def read_root():\n    return {\"Hello\": \"World\"}\n",
    os.path.join(base_dir, "app/api/__init__.py"): "",
    os.path.join(base_dir, "app/api/endpoints/__init__.py"): "",
    os.path.join(base_dir, "app/api/endpoints/users.py"): "# User-related endpoints\n\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n@router.get(\"/users\")\nasync def get_users():\n    return [{\"username\": \"example_user\"}]\n",
    os.path.join(base_dir, "app/api/endpoints/items.py"): "# Item-related endpoints\n\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n@router.get(\"/items\")\nasync def get_items():\n    return [{\"item_id\": 1, \"name\": \"example_item\"}]\n",
    os.path.join(base_dir, "app/api/dependencies.py"): "# Dependencies (like OAuth2, etc.)\n",
    os.path.join(base_dir, "app/models/__init__.py"): "",
    os.path.join(base_dir, "app/models/user.py"): "# User model\n",
    os.path.join(base_dir, "app/models/item.py"): "# Item model\n",
    os.path.join(base_dir, "app/schemas/__init__.py"): "",
    os.path.join(base_dir, "app/schemas/user.py"): "# User schemas\n",
    os.path.join(base_dir, "app/schemas/item.py"): "# Item schemas\n",
    os.path.join(base_dir, "app/services/__init__.py"): "",
    os.path.join(base_dir, "app/services/user_service.py"): "# User service\n",
    os.path.join(base_dir, "app/services/item_service.py"): "# Item service\n",
    os.path.join(base_dir, "app/config/__init__.py"): "",
    os.path.join(base_dir, "app/config/db.py"): "# Database connection\n",
    os.path.join(base_dir, "app/config/auth_models.py"): "# Database models\n",
    os.path.join(base_dir, "app/middlewares/__init__.py"): "",
    os.path.join(base_dir, "app/middlewares/authentication.py"): "# Authentication middleware\n",
    os.path.join(base_dir, "app/tests/__init__.py"): "",
    os.path.join(base_dir, "app/tests/test_users.py"): "# Tests for user endpoints\n",
    os.path.join(base_dir, "app/tests/test_items.py"): "# Tests for item endpoints\n",
    os.path.join(base_dir, "app/config.py"): "# Configuration settings\n",
}

# Create the directory structure
for folder in folder_structure:
    os.makedirs(folder, exist_ok=True)

# Create the files with initial content
for file_path, content in files_content.items():
    with open(file_path, 'w') as file:
        file.write(content)

print("Folder structure created successfully!")

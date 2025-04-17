#!/usr/bin/fish

# Check if there is a venv folder in the root folder of the project
if not test -d "mkdocs_venv"
	echo "Creating the virtual environment..."
	python -m venv ./mkdocs_venv
end

# Mount the virtual environment
source ./mkdocs_venv/bin/activate.fish
echo $VIRTUAL_ENV

pip-compile requirements.in

# Install the packages
pip install -r requirements.txt

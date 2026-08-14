#!/usr/bin/fish

# Installing Python UV
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/share/../bin/env.fish

# Check if there is a venv folder in the root folder of the project
if not test -d mkdocs_venv
    echo "Creating the virtual environment..."
    uv venv ./mkdocs_venv
end

# Mount the virtual environment
source ./mkdocs_venv/bin/activate.fish
echo $VIRTUAL_ENV

uv pip compile requirements.in --universal --output-file requirements.txt

# Install the packages
uv pip sync requirements.txt

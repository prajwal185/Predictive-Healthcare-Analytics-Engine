# Contributing to Predictive Healthcare Analytics Engine

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Predictive-Healthcare-Analytics-Engine.git`
3. Add upstream: `git remote add upstream https://github.com/prajwal185/Predictive-Healthcare-Analytics-Engine.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -e .
```

## Making Changes

1. Make your changes in your feature branch
2. Follow PEP 8 style guidelines
3. Add tests for new features
4. Run tests: `pytest`
5. Format code: `black src/`
6. Check linting: `flake8 src/`

## Commit Messages

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for refactoring

## Submitting Changes

1. Push to your fork
2. Submit a Pull Request with a clear description
3. Wait for review and address feedback
4. Once approved, your PR will be merged

## Testing

Ensure all tests pass:
```bash
pytest --cov=src
```

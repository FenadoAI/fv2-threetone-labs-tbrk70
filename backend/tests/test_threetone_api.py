"""Test Threetone website API endpoints."""
import os
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load environment
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / ".env")

BASE_URL = "http://localhost:8001/api"


def test_chat_demo_endpoint():
    """Test chat demo endpoint for threetone website."""
    try:
        payload = {
            "message": "What can threetone do for my business?",
            "context": {"source": "website_demo"}
        }

        response = requests.post(f"{BASE_URL}/chat-demo", json=payload, timeout=30)

        assert response.status_code == 200, f"Chat demo returned {response.status_code}"

        data = response.json()
        assert data.get("success"), f"Chat demo failed: {data.get('error')}"
        assert data.get("response"), "No response content from chat demo"
        assert data.get("agent_type") == "chat", "Wrong agent type"

        print("✅ Chat demo endpoint test passed")
        print(f"   Response preview: {data['response'][:100]}...")
        return True
    except Exception as e:
        print(f"❌ Chat demo endpoint test failed: {e}")
        return False


def test_contact_sales_endpoint():
    """Test contact sales form endpoint."""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company Inc",
            "message": "I'm interested in learning more about threetone's conversational AI solutions."
        }

        response = requests.post(f"{BASE_URL}/contact-sales", json=payload, timeout=10)

        assert response.status_code == 200, f"Contact sales returned {response.status_code}"

        data = response.json()
        assert data.get("success"), f"Contact sales failed: {data.get('error')}"
        assert data.get("message"), "No confirmation message"
        assert "thank you" in data["message"].lower(), "Missing thank you message"

        print("✅ Contact sales endpoint test passed")
        print(f"   Message: {data['message']}")
        return True
    except Exception as e:
        print(f"❌ Contact sales endpoint test failed: {e}")
        return False


def test_contact_sales_validation():
    """Test contact sales form validation with missing fields."""
    try:
        payload = {
            "name": "Test User",
            # Missing email, company, message
        }

        response = requests.post(f"{BASE_URL}/contact-sales", json=payload, timeout=10)

        # Should fail validation
        assert response.status_code == 422, f"Expected validation error, got {response.status_code}"

        print("✅ Contact sales validation test passed")
        return True
    except Exception as e:
        print(f"❌ Contact sales validation test failed: {e}")
        return False


if __name__ == "__main__":
    print("\n🧪 Testing Threetone Website APIs")
    print("=" * 50)
    print(f"Target: {BASE_URL}")
    print("=" * 50)

    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        print("✅ Server is running\n")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running!")
        print("   Start server: cd backend && uvicorn server:app --reload --port 8001\n")
        exit(1)

    results = []

    print("\n1️⃣ Testing Chat Demo Endpoint")
    print("-" * 50)
    results.append(test_chat_demo_endpoint())

    print("\n2️⃣ Testing Contact Sales Endpoint")
    print("-" * 50)
    results.append(test_contact_sales_endpoint())

    print("\n3️⃣ Testing Contact Sales Validation")
    print("-" * 50)
    results.append(test_contact_sales_validation())

    print("\n" + "=" * 50)
    passed = sum(results)
    total = len(results)
    print(f"Tests Passed: {passed}/{total}")

    if passed == total:
        print("🎉 All tests passed!")
    else:
        print(f"⚠️  {total - passed} test(s) failed")
        exit(1)
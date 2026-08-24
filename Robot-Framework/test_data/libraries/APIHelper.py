import requests


class APIHelper:
    """Generic API helper for Robot Framework test cases.

    Example:
        | Library | APIHelper | http://localhost:8000 |
        | ${resp}= | Get | /users |
        | ${json}= | Get Json | ${resp} |
    """

    ROBOT_LIBRARY_SCOPE = "GLOBAL"

    def __init__(self, base_url="", timeout=30, verify_ssl=True, headers=None):
        self.base_url = base_url.rstrip("/") if base_url else ""
        self.timeout = timeout
        self.verify_ssl = verify_ssl
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
        if headers:
            self.session.headers.update(headers)

    def set_base_url(self, base_url):
        self.base_url = base_url.rstrip("/") if base_url else ""

    def set_headers(self, headers):
        if headers:
            self.session.headers.update(headers)

    def build_url(self, endpoint):
        if not endpoint:
            return self.base_url
        if self.base_url:
            return f"{self.base_url}{endpoint if endpoint.startswith('/') else '/' + endpoint}"
        return endpoint

    def request(
        self,
        method,
        endpoint,
        params=None,
        json_body=None,
        data=None,
        headers=None,
        expected_status=None,
        timeout=None,
        verify=None,
    ):
        url = self.build_url(endpoint)
        request_headers = dict(self.session.headers)
        if headers:
            request_headers.update(headers)

        response = self.session.request(
            method=method.upper(),
            url=url,
            params=params,
            json=json_body,
            data=data,
            headers=request_headers,
            timeout=self.timeout if timeout is None else timeout,
            verify=self.verify_ssl if verify is None else verify,
        )

        if expected_status is not None and response.status_code != expected_status:
            raise AssertionError(
                f"Expected status {expected_status}, but got {response.status_code}. "
                f"Response: {response.text}"
            )

        return response

    def get(self, endpoint, params=None, headers=None, expected_status=None, timeout=None, verify=None):
        return self.request(
            method="GET",
            endpoint=endpoint,
            params=params,
            headers=headers,
            expected_status=expected_status,
            timeout=timeout,
            verify=verify,
        )

    def post(self, endpoint, json_body=None, data=None, headers=None, expected_status=None, timeout=None, verify=None):
        return self.request(
            method="POST",
            endpoint=endpoint,
            json_body=json_body,
            data=data,
            headers=headers,
            expected_status=expected_status,
            timeout=timeout,
            verify=verify,
        )

    def put(self, endpoint, json_body=None, data=None, headers=None, expected_status=None, timeout=None, verify=None):
        return self.request(
            method="PUT",
            endpoint=endpoint,
            json_body=json_body,
            data=data,
            headers=headers,
            expected_status=expected_status,
            timeout=timeout,
            verify=verify,
        )

    def patch(self, endpoint, json_body=None, data=None, headers=None, expected_status=None, timeout=None, verify=None):
        return self.request(
            method="PATCH",
            endpoint=endpoint,
            json_body=json_body,
            data=data,
            headers=headers,
            expected_status=expected_status,
            timeout=timeout,
            verify=verify,
        )

    def delete(self, endpoint, params=None, headers=None, expected_status=None, timeout=None, verify=None):
        return self.request(
            method="DELETE",
            endpoint=endpoint,
            params=params,
            headers=headers,
            expected_status=expected_status,
            timeout=timeout,
            verify=verify,
        )

    def get_json(self, response):
        return response.json()

    def get_status_code(self, response):
        return response.status_code

    def get_response_text(self, response):
        return response.text

    def get_value_from_json(self, response, key, default=None):
        data = response.json()
        if isinstance(data, dict):
            return data.get(key, default)
        return default

    def assert_json_has_key(self, response, key):
        payload = response.json()
        if isinstance(payload, dict) and key in payload:
            return True
        raise AssertionError(f"JSON response does not contain key '{key}'. Response: {response.text}")

    def assert_status_code(self, response, expected_status):
        if response.status_code != expected_status:
            raise AssertionError(
                f"Expected status {expected_status}, but got {response.status_code}. "
                f"Response: {response.text}"
            )
        return True


if __name__ == "__main__":
    helper = APIHelper("https://jsonplaceholder.typicode.com")
    resp = helper.get("/posts/1", expected_status=200)
    print(resp.status_code)
    print(resp.json())

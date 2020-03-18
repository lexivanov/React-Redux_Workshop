const throwIfBadRequest = response => {
    if (!response.ok) {
        throw Error(`Http error ${response.status}`);
    }
}

export class HttpService {
    static get = async (url) => {
        const response = await fetch(url);
        throwIfBadRequest(response);
        return await response.json();
    }

    static post = async (url, body) => {
        const response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            }
        );
        throwIfBadRequest(response);
        return await response.json();
    }

    static put = async (url, body) => {
        const response = await fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            }
        );
        throwIfBadRequest(response);
        await response.json();
    }

    static delete = async (url) => {
        const response = await fetch(
            url,
            {
                method: 'DELETE'
            }
        );
        throwIfBadRequest(response);
        return await response.json();
    }
}
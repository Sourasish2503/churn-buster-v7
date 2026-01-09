// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Companies extends APIResource {
    /**
     * Create a new connected account for your platform
     *
     * Required permissions:
     *
     * - `company:create_child`
     * - `company:basic:read`
     */
    create(body, options) {
        return this._client.post('/companies', { body, ...options });
    }
    /**
     * Retrieves an company by ID or its url route
     *
     * Required permissions:
     *
     * - `company:basic:read`
     */
    retrieve(id, options) {
        return this._client.get(path `/companies/${id}`, options);
    }
    /**
     * Update an existing company. Either a regular company, platform company, or one
     * of a platform's connected accounts
     *
     * Required permissions:
     *
     * - `company:update`
     * - `company:basic:read`
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/companies/${id}`, { body, ...options });
    }
    /**
     * Lists companies the current user has access to
     *
     * Required permissions:
     *
     * - `company:basic:read`
     */
    list(query, options) {
        return this._client.getAPIList('/companies', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=companies.mjs.map
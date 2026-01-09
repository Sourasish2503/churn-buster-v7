// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
export class AccessTokens extends APIResource {
    /**
     * Create a short-lived access token to authenticate API requests on behalf of a
     * Company or User. This token should be used with Whop's web and mobile embedded
     * components. You must provide either a company_id or a user_id argument, but not
     * both.
     *
     * @example
     * ```ts
     * const accessToken = await client.accessTokens.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/access_tokens', { body, ...options });
    }
}
//# sourceMappingURL=access-tokens.mjs.map
import { HttpEndpoint, HttpService } from "@fern-fern/ir-model/http";
import { AbstractGeneratedSchema } from "@fern-typescript/abstract-schema-generator";
import { PackageId, Reference } from "@fern-typescript/commons";
import { ExpressEndpointTypeSchemasContext } from "@fern-typescript/contexts";
import { GeneratedEndpointTypeSchema } from "./GeneratedEndpointTypeSchema";

export declare namespace AbstractGeneratedEndpointTypeSchema {
    export interface Init extends AbstractGeneratedSchema.Init {
        packageId: PackageId;
        service: HttpService;
        endpoint: HttpEndpoint;
    }
}

export abstract class AbstractGeneratedEndpointTypeSchema
    extends AbstractGeneratedSchema<ExpressEndpointTypeSchemasContext>
    implements GeneratedEndpointTypeSchema
{
    protected packageId: PackageId;
    protected service: HttpService;
    protected endpoint: HttpEndpoint;

    constructor({ packageId, service, endpoint, ...superInit }: AbstractGeneratedEndpointTypeSchema.Init) {
        super(superInit);
        this.packageId = packageId;
        this.service = service;
        this.endpoint = endpoint;
    }

    protected getReferenceToSchema(context: ExpressEndpointTypeSchemasContext): Reference {
        return context.expressEndpointTypeSchemas.getReferenceToEndpointTypeSchemaExport(
            this.packageId,
            this.endpoint.name,
            [this.typeName]
        );
    }
}

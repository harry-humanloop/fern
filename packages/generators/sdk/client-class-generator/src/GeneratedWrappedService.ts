import { SubpackageId } from "@fern-fern/ir-model/commons";
import { Subpackage } from "@fern-fern/ir-model/ir";
import { getTextOfTsNode, Reference } from "@fern-typescript/commons";
import { SdkClientClassContext } from "@fern-typescript/contexts";
import { ClassDeclaration, Scope, ts } from "ts-morph";
import { GeneratedSdkClientClassImpl } from "./GeneratedSdkClientClassImpl";

export declare namespace GeneratedWrappedService {
    interface Init {
        wrapperService: GeneratedSdkClientClassImpl;
        wrappedSubpackageId: SubpackageId;
        wrappedSubpackage: Subpackage;
    }
}

export class GeneratedWrappedService {
    private wrapperService: GeneratedSdkClientClassImpl;
    private wrappedSubpackageId: SubpackageId;
    private wrappedSubpackage: Subpackage;

    constructor({ wrapperService, wrappedSubpackageId, wrappedSubpackage }: GeneratedWrappedService.Init) {
        this.wrapperService = wrapperService;
        this.wrappedSubpackageId = wrappedSubpackageId;
        this.wrappedSubpackage = wrappedSubpackage;
    }

    public addToServiceClass(class_: ClassDeclaration, context: SdkClientClassContext): void {
        const referenceToWrapped = this.getReferenceToWrappedService(class_, context);
        const generatedWrappedService = context.sdkClientClass.getGeneratedSdkClientClass({
            isRoot: false,
            subpackageId: this.wrappedSubpackageId,
        });

        class_.addProperty({
            name: this.getCachedMemberName(),
            scope: Scope.Private,
            type: getTextOfTsNode(
                ts.factory.createUnionTypeNode([
                    referenceToWrapped.getTypeNode(),
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
                ])
            ),
        });

        class_.addGetAccessor({
            name: this.getGetterName(),
            returnType: getTextOfTsNode(referenceToWrapped.getTypeNode()),
            scope: Scope.Public,
            statements: [
                getTextOfTsNode(
                    ts.factory.createReturnStatement(
                        ts.factory.createParenthesizedExpression(
                            ts.factory.createBinaryExpression(
                                ts.factory.createPropertyAccessExpression(
                                    ts.factory.createThis(),
                                    this.getCachedMemberName()
                                ),
                                ts.SyntaxKind.QuestionQuestionEqualsToken,
                                generatedWrappedService.instantiate({
                                    referenceToClient: referenceToWrapped.getExpression(),
                                    referenceToOptions: this.wrapperService.getReferenceToOptions(),
                                })
                            )
                        )
                    )
                ),
            ],
        });
    }

    private getCachedMemberName(): string {
        return `_${this.getGetterName()}`;
    }

    private getGetterName(): string {
        const lastFernFilepathPart =
            this.wrappedSubpackage.fernFilepath.allParts[this.wrappedSubpackage.fernFilepath.allParts.length - 1];
        if (lastFernFilepathPart == null) {
            throw new Error("Cannot generate wrapped service because FernFilepath is empty");
        }
        return lastFernFilepathPart.camelCase.unsafeName;
    }

    private getReferenceToWrappedService(serviceClass: ClassDeclaration, context: SdkClientClassContext): Reference {
        const reference = context.sdkClientClass.getReferenceToClientClass({
            isRoot: false,
            subpackageId: this.wrappedSubpackageId,
        });
        const wrappedServiceClassName = getTextOfTsNode(
            reference.getTypeNode({
                // we don't want to add the import unnecessarily
                isForComment: true,
            })
        );

        if (wrappedServiceClassName !== serviceClass.getName()) {
            return reference;
        } else {
            return context.sdkClientClass.getReferenceToClientClass(
                { isRoot: false, subpackageId: this.wrappedSubpackageId },
                {
                    importAlias: `${wrappedServiceClassName}_`,
                }
            );
        }
    }
}

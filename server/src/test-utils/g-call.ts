import { graphql } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/user";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const gCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    source,
    variableValues,
  });
};

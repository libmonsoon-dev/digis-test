import { Connection, ObjectLiteral, QueryBuilder, Repository } from 'typeorm/index';

type PostgresExplainParameters = {
  analyze?: boolean;
  verbose?: boolean;
  costs?: boolean;
  buffers?: boolean;
  timing?: boolean;
};

export class BasePostgresRepository<T extends ObjectLiteral> extends Repository<T> {

  async explain<T extends ObjectLiteral>(
    qb: QueryBuilder<T>,
    connection: Connection = qb.connection,
    explainParameters: PostgresExplainParameters = {
      analyze: true,
      verbose: true,
      buffers: true,
    },
    format: 'text' | 'xml' | 'json' | 'yaml' = 'json') {
    const boolParameters = Object.entries(explainParameters)
      .filter((argument): argument is [string, boolean] => typeof argument[1] === 'boolean')
      .map(([key, value]) => `${key} ${value}`);

    const explainParametersString = [
      ...boolParameters,
      `FORMAT ${format.toUpperCase()}`,
    ].join(', ').toUpperCase();

    const [originalQuery, queryParameters] = qb.getQueryAndParameters();
    const query = `EXPLAIN (${explainParametersString}) ${originalQuery}`;
    return connection.query(query, queryParameters);
  }

}

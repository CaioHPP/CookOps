
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Empresa
 * 
 */
export type Empresa = $Result.DefaultSelection<Prisma.$EmpresaPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Plano
 * 
 */
export type Plano = $Result.DefaultSelection<Prisma.$PlanoPayload>
/**
 * Model Assinatura
 * 
 */
export type Assinatura = $Result.DefaultSelection<Prisma.$AssinaturaPayload>
/**
 * Model Board
 * 
 */
export type Board = $Result.DefaultSelection<Prisma.$BoardPayload>
/**
 * Model PedidoStatus
 * 
 */
export type PedidoStatus = $Result.DefaultSelection<Prisma.$PedidoStatusPayload>
/**
 * Model Pedido
 * 
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>
/**
 * Model PedidoItem
 * 
 */
export type PedidoItem = $Result.DefaultSelection<Prisma.$PedidoItemPayload>
/**
 * Model Produto
 * 
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>
/**
 * Model FormaPagamento
 * 
 */
export type FormaPagamento = $Result.DefaultSelection<Prisma.$FormaPagamentoPayload>
/**
 * Model FontePedido
 * 
 */
export type FontePedido = $Result.DefaultSelection<Prisma.$FontePedidoPayload>
/**
 * Model Endereco
 * 
 */
export type Endereco = $Result.DefaultSelection<Prisma.$EnderecoPayload>
/**
 * Model LogMovimentacao
 * 
 */
export type LogMovimentacao = $Result.DefaultSelection<Prisma.$LogMovimentacaoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  FUNCIONARIO: 'FUNCIONARIO'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Empresas
 * const empresas = await prisma.empresa.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Empresas
   * const empresas = await prisma.empresa.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plano`: Exposes CRUD operations for the **Plano** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Planos
    * const planos = await prisma.plano.findMany()
    * ```
    */
  get plano(): Prisma.PlanoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assinatura`: Exposes CRUD operations for the **Assinatura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assinaturas
    * const assinaturas = await prisma.assinatura.findMany()
    * ```
    */
  get assinatura(): Prisma.AssinaturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.board`: Exposes CRUD operations for the **Board** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Boards
    * const boards = await prisma.board.findMany()
    * ```
    */
  get board(): Prisma.BoardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidoStatus`: Exposes CRUD operations for the **PedidoStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoStatuses
    * const pedidoStatuses = await prisma.pedidoStatus.findMany()
    * ```
    */
  get pedidoStatus(): Prisma.PedidoStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedido.findMany()
    * ```
    */
  get pedido(): Prisma.PedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidoItem`: Exposes CRUD operations for the **PedidoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoItems
    * const pedidoItems = await prisma.pedidoItem.findMany()
    * ```
    */
  get pedidoItem(): Prisma.PedidoItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formaPagamento`: Exposes CRUD operations for the **FormaPagamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormaPagamentos
    * const formaPagamentos = await prisma.formaPagamento.findMany()
    * ```
    */
  get formaPagamento(): Prisma.FormaPagamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fontePedido`: Exposes CRUD operations for the **FontePedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FontePedidos
    * const fontePedidos = await prisma.fontePedido.findMany()
    * ```
    */
  get fontePedido(): Prisma.FontePedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.endereco`: Exposes CRUD operations for the **Endereco** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enderecos
    * const enderecos = await prisma.endereco.findMany()
    * ```
    */
  get endereco(): Prisma.EnderecoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logMovimentacao`: Exposes CRUD operations for the **LogMovimentacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogMovimentacaos
    * const logMovimentacaos = await prisma.logMovimentacao.findMany()
    * ```
    */
  get logMovimentacao(): Prisma.LogMovimentacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Empresa: 'Empresa',
    Usuario: 'Usuario',
    Plano: 'Plano',
    Assinatura: 'Assinatura',
    Board: 'Board',
    PedidoStatus: 'PedidoStatus',
    Pedido: 'Pedido',
    PedidoItem: 'PedidoItem',
    Produto: 'Produto',
    FormaPagamento: 'FormaPagamento',
    FontePedido: 'FontePedido',
    Endereco: 'Endereco',
    LogMovimentacao: 'LogMovimentacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "empresa" | "usuario" | "plano" | "assinatura" | "board" | "pedidoStatus" | "pedido" | "pedidoItem" | "produto" | "formaPagamento" | "fontePedido" | "endereco" | "logMovimentacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Empresa: {
        payload: Prisma.$EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Plano: {
        payload: Prisma.$PlanoPayload<ExtArgs>
        fields: Prisma.PlanoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          findFirst: {
            args: Prisma.PlanoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          findMany: {
            args: Prisma.PlanoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>[]
          }
          create: {
            args: Prisma.PlanoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          createMany: {
            args: Prisma.PlanoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlanoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          update: {
            args: Prisma.PlanoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          deleteMany: {
            args: Prisma.PlanoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlanoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanoPayload>
          }
          aggregate: {
            args: Prisma.PlanoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlano>
          }
          groupBy: {
            args: Prisma.PlanoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanoCountArgs<ExtArgs>
            result: $Utils.Optional<PlanoCountAggregateOutputType> | number
          }
        }
      }
      Assinatura: {
        payload: Prisma.$AssinaturaPayload<ExtArgs>
        fields: Prisma.AssinaturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssinaturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssinaturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          findFirst: {
            args: Prisma.AssinaturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssinaturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          findMany: {
            args: Prisma.AssinaturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>[]
          }
          create: {
            args: Prisma.AssinaturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          createMany: {
            args: Prisma.AssinaturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssinaturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          update: {
            args: Prisma.AssinaturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          deleteMany: {
            args: Prisma.AssinaturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssinaturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssinaturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssinaturaPayload>
          }
          aggregate: {
            args: Prisma.AssinaturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssinatura>
          }
          groupBy: {
            args: Prisma.AssinaturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssinaturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssinaturaCountArgs<ExtArgs>
            result: $Utils.Optional<AssinaturaCountAggregateOutputType> | number
          }
        }
      }
      Board: {
        payload: Prisma.$BoardPayload<ExtArgs>
        fields: Prisma.BoardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          findFirst: {
            args: Prisma.BoardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          findMany: {
            args: Prisma.BoardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[]
          }
          create: {
            args: Prisma.BoardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          createMany: {
            args: Prisma.BoardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BoardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          update: {
            args: Prisma.BoardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          deleteMany: {
            args: Prisma.BoardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BoardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          aggregate: {
            args: Prisma.BoardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoard>
          }
          groupBy: {
            args: Prisma.BoardGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoardGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoardCountArgs<ExtArgs>
            result: $Utils.Optional<BoardCountAggregateOutputType> | number
          }
        }
      }
      PedidoStatus: {
        payload: Prisma.$PedidoStatusPayload<ExtArgs>
        fields: Prisma.PedidoStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          findFirst: {
            args: Prisma.PedidoStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          findMany: {
            args: Prisma.PedidoStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>[]
          }
          create: {
            args: Prisma.PedidoStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          createMany: {
            args: Prisma.PedidoStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PedidoStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          update: {
            args: Prisma.PedidoStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          deleteMany: {
            args: Prisma.PedidoStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidoStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoStatusPayload>
          }
          aggregate: {
            args: Prisma.PedidoStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoStatus>
          }
          groupBy: {
            args: Prisma.PedidoStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoStatusCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoStatusCountAggregateOutputType> | number
          }
        }
      }
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>
        fields: Prisma.PedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido>
          }
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number
          }
        }
      }
      PedidoItem: {
        payload: Prisma.$PedidoItemPayload<ExtArgs>
        fields: Prisma.PedidoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findFirst: {
            args: Prisma.PedidoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findMany: {
            args: Prisma.PedidoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          create: {
            args: Prisma.PedidoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          createMany: {
            args: Prisma.PedidoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PedidoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          update: {
            args: Prisma.PedidoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          deleteMany: {
            args: Prisma.PedidoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          aggregate: {
            args: Prisma.PedidoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoItem>
          }
          groupBy: {
            args: Prisma.PedidoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoItemCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemCountAggregateOutputType> | number
          }
        }
      }
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>
        fields: Prisma.ProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduto>
          }
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number
          }
        }
      }
      FormaPagamento: {
        payload: Prisma.$FormaPagamentoPayload<ExtArgs>
        fields: Prisma.FormaPagamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormaPagamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormaPagamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          findFirst: {
            args: Prisma.FormaPagamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormaPagamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          findMany: {
            args: Prisma.FormaPagamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>[]
          }
          create: {
            args: Prisma.FormaPagamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          createMany: {
            args: Prisma.FormaPagamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormaPagamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          update: {
            args: Prisma.FormaPagamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          deleteMany: {
            args: Prisma.FormaPagamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormaPagamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormaPagamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormaPagamentoPayload>
          }
          aggregate: {
            args: Prisma.FormaPagamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormaPagamento>
          }
          groupBy: {
            args: Prisma.FormaPagamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormaPagamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormaPagamentoCountArgs<ExtArgs>
            result: $Utils.Optional<FormaPagamentoCountAggregateOutputType> | number
          }
        }
      }
      FontePedido: {
        payload: Prisma.$FontePedidoPayload<ExtArgs>
        fields: Prisma.FontePedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FontePedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FontePedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          findFirst: {
            args: Prisma.FontePedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FontePedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          findMany: {
            args: Prisma.FontePedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>[]
          }
          create: {
            args: Prisma.FontePedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          createMany: {
            args: Prisma.FontePedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FontePedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          update: {
            args: Prisma.FontePedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          deleteMany: {
            args: Prisma.FontePedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FontePedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FontePedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontePedidoPayload>
          }
          aggregate: {
            args: Prisma.FontePedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFontePedido>
          }
          groupBy: {
            args: Prisma.FontePedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FontePedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FontePedidoCountArgs<ExtArgs>
            result: $Utils.Optional<FontePedidoCountAggregateOutputType> | number
          }
        }
      }
      Endereco: {
        payload: Prisma.$EnderecoPayload<ExtArgs>
        fields: Prisma.EnderecoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnderecoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnderecoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          findFirst: {
            args: Prisma.EnderecoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnderecoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          findMany: {
            args: Prisma.EnderecoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[]
          }
          create: {
            args: Prisma.EnderecoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          createMany: {
            args: Prisma.EnderecoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EnderecoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          update: {
            args: Prisma.EnderecoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          deleteMany: {
            args: Prisma.EnderecoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnderecoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnderecoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          aggregate: {
            args: Prisma.EnderecoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEndereco>
          }
          groupBy: {
            args: Prisma.EnderecoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnderecoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnderecoCountArgs<ExtArgs>
            result: $Utils.Optional<EnderecoCountAggregateOutputType> | number
          }
        }
      }
      LogMovimentacao: {
        payload: Prisma.$LogMovimentacaoPayload<ExtArgs>
        fields: Prisma.LogMovimentacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogMovimentacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogMovimentacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          findFirst: {
            args: Prisma.LogMovimentacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogMovimentacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          findMany: {
            args: Prisma.LogMovimentacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>[]
          }
          create: {
            args: Prisma.LogMovimentacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          createMany: {
            args: Prisma.LogMovimentacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LogMovimentacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          update: {
            args: Prisma.LogMovimentacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          deleteMany: {
            args: Prisma.LogMovimentacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogMovimentacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LogMovimentacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogMovimentacaoPayload>
          }
          aggregate: {
            args: Prisma.LogMovimentacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogMovimentacao>
          }
          groupBy: {
            args: Prisma.LogMovimentacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogMovimentacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogMovimentacaoCountArgs<ExtArgs>
            result: $Utils.Optional<LogMovimentacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    empresa?: EmpresaOmit
    usuario?: UsuarioOmit
    plano?: PlanoOmit
    assinatura?: AssinaturaOmit
    board?: BoardOmit
    pedidoStatus?: PedidoStatusOmit
    pedido?: PedidoOmit
    pedidoItem?: PedidoItemOmit
    produto?: ProdutoOmit
    formaPagamento?: FormaPagamentoOmit
    fontePedido?: FontePedidoOmit
    endereco?: EnderecoOmit
    logMovimentacao?: LogMovimentacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmpresaCountOutputType
   */

  export type EmpresaCountOutputType = {
    usuarios: number
    boards: number
    pedidos: number
    produtos: number
  }

  export type EmpresaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | EmpresaCountOutputTypeCountUsuariosArgs
    boards?: boolean | EmpresaCountOutputTypeCountBoardsArgs
    pedidos?: boolean | EmpresaCountOutputTypeCountPedidosArgs
    produtos?: boolean | EmpresaCountOutputTypeCountProdutosArgs
  }

  // Custom InputTypes
  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaCountOutputType
     */
    select?: EmpresaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountBoardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
  }


  /**
   * Count Type PlanoCountOutputType
   */

  export type PlanoCountOutputType = {
    empresas: number
    assinaturas: number
  }

  export type PlanoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | PlanoCountOutputTypeCountEmpresasArgs
    assinaturas?: boolean | PlanoCountOutputTypeCountAssinaturasArgs
  }

  // Custom InputTypes
  /**
   * PlanoCountOutputType without action
   */
  export type PlanoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanoCountOutputType
     */
    select?: PlanoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanoCountOutputType without action
   */
  export type PlanoCountOutputTypeCountEmpresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
  }

  /**
   * PlanoCountOutputType without action
   */
  export type PlanoCountOutputTypeCountAssinaturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssinaturaWhereInput
  }


  /**
   * Count Type BoardCountOutputType
   */

  export type BoardCountOutputType = {
    listas: number
  }

  export type BoardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listas?: boolean | BoardCountOutputTypeCountListasArgs
  }

  // Custom InputTypes
  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCountOutputType
     */
    select?: BoardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountListasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoStatusWhereInput
  }


  /**
   * Count Type PedidoStatusCountOutputType
   */

  export type PedidoStatusCountOutputType = {
    pedidos: number
    logsOrigem: number
    logsDestino: number
  }

  export type PedidoStatusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | PedidoStatusCountOutputTypeCountPedidosArgs
    logsOrigem?: boolean | PedidoStatusCountOutputTypeCountLogsOrigemArgs
    logsDestino?: boolean | PedidoStatusCountOutputTypeCountLogsDestinoArgs
  }

  // Custom InputTypes
  /**
   * PedidoStatusCountOutputType without action
   */
  export type PedidoStatusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatusCountOutputType
     */
    select?: PedidoStatusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoStatusCountOutputType without action
   */
  export type PedidoStatusCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }

  /**
   * PedidoStatusCountOutputType without action
   */
  export type PedidoStatusCountOutputTypeCountLogsOrigemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogMovimentacaoWhereInput
  }

  /**
   * PedidoStatusCountOutputType without action
   */
  export type PedidoStatusCountOutputTypeCountLogsDestinoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogMovimentacaoWhereInput
  }


  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    itens: number
    logs: number
  }

  export type PedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | PedidoCountOutputTypeCountItensArgs
    logs?: boolean | PedidoCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogMovimentacaoWhereInput
  }


  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    itensPedido: number
  }

  export type ProdutoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensPedido?: boolean | ProdutoCountOutputTypeCountItensPedidoArgs
  }

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountItensPedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
  }


  /**
   * Count Type FormaPagamentoCountOutputType
   */

  export type FormaPagamentoCountOutputType = {
    pedidos: number
  }

  export type FormaPagamentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | FormaPagamentoCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * FormaPagamentoCountOutputType without action
   */
  export type FormaPagamentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamentoCountOutputType
     */
    select?: FormaPagamentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormaPagamentoCountOutputType without action
   */
  export type FormaPagamentoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }


  /**
   * Count Type FontePedidoCountOutputType
   */

  export type FontePedidoCountOutputType = {
    pedidos: number
  }

  export type FontePedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | FontePedidoCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * FontePedidoCountOutputType without action
   */
  export type FontePedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedidoCountOutputType
     */
    select?: FontePedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FontePedidoCountOutputType without action
   */
  export type FontePedidoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }


  /**
   * Count Type EnderecoCountOutputType
   */

  export type EnderecoCountOutputType = {
    pedidos: number
  }

  export type EnderecoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | EnderecoCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * EnderecoCountOutputType without action
   */
  export type EnderecoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnderecoCountOutputType
     */
    select?: EnderecoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EnderecoCountOutputType without action
   */
  export type EnderecoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Empresa
   */

  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    email: string | null
    telefone: string | null
    planoAtualId: string | null
    criadaEm: Date | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    email: string | null
    telefone: string | null
    planoAtualId: string | null
    criadaEm: Date | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    nome: number
    cnpj: number
    email: number
    telefone: number
    planoAtualId: number
    criadaEm: number
    _all: number
  }


  export type EmpresaMinAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    telefone?: true
    planoAtualId?: true
    criadaEm?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    telefone?: true
    planoAtualId?: true
    criadaEm?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    telefone?: true
    planoAtualId?: true
    criadaEm?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }

  export type EmpresaGroupByOutputType = {
    id: string
    nome: string
    cnpj: string | null
    email: string | null
    telefone: string | null
    planoAtualId: string
    criadaEm: Date
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    telefone?: boolean
    planoAtualId?: boolean
    criadaEm?: boolean
    plano?: boolean | PlanoDefaultArgs<ExtArgs>
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    boards?: boolean | Empresa$boardsArgs<ExtArgs>
    pedidos?: boolean | Empresa$pedidosArgs<ExtArgs>
    produtos?: boolean | Empresa$produtosArgs<ExtArgs>
    assinatura?: boolean | Empresa$assinaturaArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>



  export type EmpresaSelectScalar = {
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    telefone?: boolean
    planoAtualId?: boolean
    criadaEm?: boolean
  }

  export type EmpresaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cnpj" | "email" | "telefone" | "planoAtualId" | "criadaEm", ExtArgs["result"]["empresa"]>
  export type EmpresaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plano?: boolean | PlanoDefaultArgs<ExtArgs>
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    boards?: boolean | Empresa$boardsArgs<ExtArgs>
    pedidos?: boolean | Empresa$pedidosArgs<ExtArgs>
    produtos?: boolean | Empresa$produtosArgs<ExtArgs>
    assinatura?: boolean | Empresa$assinaturaArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmpresaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Empresa"
    objects: {
      plano: Prisma.$PlanoPayload<ExtArgs>
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
      boards: Prisma.$BoardPayload<ExtArgs>[]
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
      produtos: Prisma.$ProdutoPayload<ExtArgs>[]
      assinatura: Prisma.$AssinaturaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cnpj: string | null
      email: string | null
      telefone: string | null
      planoAtualId: string
      criadaEm: Date
    }, ExtArgs["result"]["empresa"]>
    composites: {}
  }

  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = $Result.GetResult<Prisma.$EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaFindUniqueArgs>(args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Empresa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaFindFirstArgs>(args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmpresaFindManyArgs>(args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
     */
    create<T extends EmpresaCreateArgs>(args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Empresas.
     * @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaCreateManyArgs>(args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
     */
    delete<T extends EmpresaDeleteArgs>(args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaUpdateArgs>(args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaUpdateManyArgs>(args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaUpsertArgs>(args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plano<T extends PlanoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanoDefaultArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuarios<T extends Empresa$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    boards<T extends Empresa$boardsArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$boardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pedidos<T extends Empresa$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    produtos<T extends Empresa$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assinatura<T extends Empresa$assinaturaArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$assinaturaArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Empresa model
   */
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'String'>
    readonly nome: FieldRef<"Empresa", 'String'>
    readonly cnpj: FieldRef<"Empresa", 'String'>
    readonly email: FieldRef<"Empresa", 'String'>
    readonly telefone: FieldRef<"Empresa", 'String'>
    readonly planoAtualId: FieldRef<"Empresa", 'String'>
    readonly criadaEm: FieldRef<"Empresa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }

  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }

  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to delete.
     */
    limit?: number
  }

  /**
   * Empresa.usuarios
   */
  export type Empresa$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Empresa.boards
   */
  export type Empresa$boardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    where?: BoardWhereInput
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    cursor?: BoardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Empresa.pedidos
   */
  export type Empresa$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Empresa.produtos
   */
  export type Empresa$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    cursor?: ProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Empresa.assinatura
   */
  export type Empresa$assinaturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    where?: AssinaturaWhereInput
  }

  /**
   * Empresa without action
   */
  export type EmpresaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    role: $Enums.Role | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    role: $Enums.Role | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    email: number
    senhaHash: number
    role: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senhaHash?: true
    role?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senhaHash?: true
    role?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senhaHash?: true
    role?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    email: string
    senhaHash: string
    role: $Enums.Role
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    role?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type UsuarioSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    role?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "email" | "senhaHash" | "role", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      email: string
      senhaHash: string
      role: $Enums.Role
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly empresaId: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senhaHash: FieldRef<"Usuario", 'String'>
    readonly role: FieldRef<"Usuario", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Plano
   */

  export type AggregatePlano = {
    _count: PlanoCountAggregateOutputType | null
    _avg: PlanoAvgAggregateOutputType | null
    _sum: PlanoSumAggregateOutputType | null
    _min: PlanoMinAggregateOutputType | null
    _max: PlanoMaxAggregateOutputType | null
  }

  export type PlanoAvgAggregateOutputType = {
    limitePedidosMes: number | null
    precoMensal: number | null
  }

  export type PlanoSumAggregateOutputType = {
    limitePedidosMes: number | null
    precoMensal: number | null
  }

  export type PlanoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    limitePedidosMes: number | null
    precoMensal: number | null
    ativo: boolean | null
  }

  export type PlanoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    limitePedidosMes: number | null
    precoMensal: number | null
    ativo: boolean | null
  }

  export type PlanoCountAggregateOutputType = {
    id: number
    nome: number
    limitePedidosMes: number
    precoMensal: number
    ativo: number
    _all: number
  }


  export type PlanoAvgAggregateInputType = {
    limitePedidosMes?: true
    precoMensal?: true
  }

  export type PlanoSumAggregateInputType = {
    limitePedidosMes?: true
    precoMensal?: true
  }

  export type PlanoMinAggregateInputType = {
    id?: true
    nome?: true
    limitePedidosMes?: true
    precoMensal?: true
    ativo?: true
  }

  export type PlanoMaxAggregateInputType = {
    id?: true
    nome?: true
    limitePedidosMes?: true
    precoMensal?: true
    ativo?: true
  }

  export type PlanoCountAggregateInputType = {
    id?: true
    nome?: true
    limitePedidosMes?: true
    precoMensal?: true
    ativo?: true
    _all?: true
  }

  export type PlanoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plano to aggregate.
     */
    where?: PlanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Planos to fetch.
     */
    orderBy?: PlanoOrderByWithRelationInput | PlanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Planos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Planos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Planos
    **/
    _count?: true | PlanoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanoMaxAggregateInputType
  }

  export type GetPlanoAggregateType<T extends PlanoAggregateArgs> = {
        [P in keyof T & keyof AggregatePlano]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlano[P]>
      : GetScalarType<T[P], AggregatePlano[P]>
  }




  export type PlanoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanoWhereInput
    orderBy?: PlanoOrderByWithAggregationInput | PlanoOrderByWithAggregationInput[]
    by: PlanoScalarFieldEnum[] | PlanoScalarFieldEnum
    having?: PlanoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanoCountAggregateInputType | true
    _avg?: PlanoAvgAggregateInputType
    _sum?: PlanoSumAggregateInputType
    _min?: PlanoMinAggregateInputType
    _max?: PlanoMaxAggregateInputType
  }

  export type PlanoGroupByOutputType = {
    id: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo: boolean
    _count: PlanoCountAggregateOutputType | null
    _avg: PlanoAvgAggregateOutputType | null
    _sum: PlanoSumAggregateOutputType | null
    _min: PlanoMinAggregateOutputType | null
    _max: PlanoMaxAggregateOutputType | null
  }

  type GetPlanoGroupByPayload<T extends PlanoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanoGroupByOutputType[P]>
            : GetScalarType<T[P], PlanoGroupByOutputType[P]>
        }
      >
    >


  export type PlanoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    limitePedidosMes?: boolean
    precoMensal?: boolean
    ativo?: boolean
    empresas?: boolean | Plano$empresasArgs<ExtArgs>
    assinaturas?: boolean | Plano$assinaturasArgs<ExtArgs>
    _count?: boolean | PlanoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plano"]>



  export type PlanoSelectScalar = {
    id?: boolean
    nome?: boolean
    limitePedidosMes?: boolean
    precoMensal?: boolean
    ativo?: boolean
  }

  export type PlanoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "limitePedidosMes" | "precoMensal" | "ativo", ExtArgs["result"]["plano"]>
  export type PlanoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | Plano$empresasArgs<ExtArgs>
    assinaturas?: boolean | Plano$assinaturasArgs<ExtArgs>
    _count?: boolean | PlanoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PlanoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plano"
    objects: {
      empresas: Prisma.$EmpresaPayload<ExtArgs>[]
      assinaturas: Prisma.$AssinaturaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      limitePedidosMes: number
      precoMensal: number
      ativo: boolean
    }, ExtArgs["result"]["plano"]>
    composites: {}
  }

  type PlanoGetPayload<S extends boolean | null | undefined | PlanoDefaultArgs> = $Result.GetResult<Prisma.$PlanoPayload, S>

  type PlanoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanoCountAggregateInputType | true
    }

  export interface PlanoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plano'], meta: { name: 'Plano' } }
    /**
     * Find zero or one Plano that matches the filter.
     * @param {PlanoFindUniqueArgs} args - Arguments to find a Plano
     * @example
     * // Get one Plano
     * const plano = await prisma.plano.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanoFindUniqueArgs>(args: SelectSubset<T, PlanoFindUniqueArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plano that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanoFindUniqueOrThrowArgs} args - Arguments to find a Plano
     * @example
     * // Get one Plano
     * const plano = await prisma.plano.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanoFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plano that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoFindFirstArgs} args - Arguments to find a Plano
     * @example
     * // Get one Plano
     * const plano = await prisma.plano.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanoFindFirstArgs>(args?: SelectSubset<T, PlanoFindFirstArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plano that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoFindFirstOrThrowArgs} args - Arguments to find a Plano
     * @example
     * // Get one Plano
     * const plano = await prisma.plano.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanoFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Planos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Planos
     * const planos = await prisma.plano.findMany()
     * 
     * // Get first 10 Planos
     * const planos = await prisma.plano.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planoWithIdOnly = await prisma.plano.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanoFindManyArgs>(args?: SelectSubset<T, PlanoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plano.
     * @param {PlanoCreateArgs} args - Arguments to create a Plano.
     * @example
     * // Create one Plano
     * const Plano = await prisma.plano.create({
     *   data: {
     *     // ... data to create a Plano
     *   }
     * })
     * 
     */
    create<T extends PlanoCreateArgs>(args: SelectSubset<T, PlanoCreateArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Planos.
     * @param {PlanoCreateManyArgs} args - Arguments to create many Planos.
     * @example
     * // Create many Planos
     * const plano = await prisma.plano.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanoCreateManyArgs>(args?: SelectSubset<T, PlanoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Plano.
     * @param {PlanoDeleteArgs} args - Arguments to delete one Plano.
     * @example
     * // Delete one Plano
     * const Plano = await prisma.plano.delete({
     *   where: {
     *     // ... filter to delete one Plano
     *   }
     * })
     * 
     */
    delete<T extends PlanoDeleteArgs>(args: SelectSubset<T, PlanoDeleteArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plano.
     * @param {PlanoUpdateArgs} args - Arguments to update one Plano.
     * @example
     * // Update one Plano
     * const plano = await prisma.plano.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanoUpdateArgs>(args: SelectSubset<T, PlanoUpdateArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Planos.
     * @param {PlanoDeleteManyArgs} args - Arguments to filter Planos to delete.
     * @example
     * // Delete a few Planos
     * const { count } = await prisma.plano.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanoDeleteManyArgs>(args?: SelectSubset<T, PlanoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Planos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Planos
     * const plano = await prisma.plano.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanoUpdateManyArgs>(args: SelectSubset<T, PlanoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Plano.
     * @param {PlanoUpsertArgs} args - Arguments to update or create a Plano.
     * @example
     * // Update or create a Plano
     * const plano = await prisma.plano.upsert({
     *   create: {
     *     // ... data to create a Plano
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plano we want to update
     *   }
     * })
     */
    upsert<T extends PlanoUpsertArgs>(args: SelectSubset<T, PlanoUpsertArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Planos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoCountArgs} args - Arguments to filter Planos to count.
     * @example
     * // Count the number of Planos
     * const count = await prisma.plano.count({
     *   where: {
     *     // ... the filter for the Planos we want to count
     *   }
     * })
    **/
    count<T extends PlanoCountArgs>(
      args?: Subset<T, PlanoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanoAggregateArgs>(args: Subset<T, PlanoAggregateArgs>): Prisma.PrismaPromise<GetPlanoAggregateType<T>>

    /**
     * Group by Plano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanoGroupByArgs['orderBy'] }
        : { orderBy?: PlanoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plano model
   */
  readonly fields: PlanoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plano.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresas<T extends Plano$empresasArgs<ExtArgs> = {}>(args?: Subset<T, Plano$empresasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assinaturas<T extends Plano$assinaturasArgs<ExtArgs> = {}>(args?: Subset<T, Plano$assinaturasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plano model
   */
  interface PlanoFieldRefs {
    readonly id: FieldRef<"Plano", 'String'>
    readonly nome: FieldRef<"Plano", 'String'>
    readonly limitePedidosMes: FieldRef<"Plano", 'Int'>
    readonly precoMensal: FieldRef<"Plano", 'Float'>
    readonly ativo: FieldRef<"Plano", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Plano findUnique
   */
  export type PlanoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter, which Plano to fetch.
     */
    where: PlanoWhereUniqueInput
  }

  /**
   * Plano findUniqueOrThrow
   */
  export type PlanoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter, which Plano to fetch.
     */
    where: PlanoWhereUniqueInput
  }

  /**
   * Plano findFirst
   */
  export type PlanoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter, which Plano to fetch.
     */
    where?: PlanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Planos to fetch.
     */
    orderBy?: PlanoOrderByWithRelationInput | PlanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Planos.
     */
    cursor?: PlanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Planos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Planos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Planos.
     */
    distinct?: PlanoScalarFieldEnum | PlanoScalarFieldEnum[]
  }

  /**
   * Plano findFirstOrThrow
   */
  export type PlanoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter, which Plano to fetch.
     */
    where?: PlanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Planos to fetch.
     */
    orderBy?: PlanoOrderByWithRelationInput | PlanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Planos.
     */
    cursor?: PlanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Planos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Planos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Planos.
     */
    distinct?: PlanoScalarFieldEnum | PlanoScalarFieldEnum[]
  }

  /**
   * Plano findMany
   */
  export type PlanoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter, which Planos to fetch.
     */
    where?: PlanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Planos to fetch.
     */
    orderBy?: PlanoOrderByWithRelationInput | PlanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Planos.
     */
    cursor?: PlanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Planos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Planos.
     */
    skip?: number
    distinct?: PlanoScalarFieldEnum | PlanoScalarFieldEnum[]
  }

  /**
   * Plano create
   */
  export type PlanoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * The data needed to create a Plano.
     */
    data: XOR<PlanoCreateInput, PlanoUncheckedCreateInput>
  }

  /**
   * Plano createMany
   */
  export type PlanoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Planos.
     */
    data: PlanoCreateManyInput | PlanoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plano update
   */
  export type PlanoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * The data needed to update a Plano.
     */
    data: XOR<PlanoUpdateInput, PlanoUncheckedUpdateInput>
    /**
     * Choose, which Plano to update.
     */
    where: PlanoWhereUniqueInput
  }

  /**
   * Plano updateMany
   */
  export type PlanoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Planos.
     */
    data: XOR<PlanoUpdateManyMutationInput, PlanoUncheckedUpdateManyInput>
    /**
     * Filter which Planos to update
     */
    where?: PlanoWhereInput
    /**
     * Limit how many Planos to update.
     */
    limit?: number
  }

  /**
   * Plano upsert
   */
  export type PlanoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * The filter to search for the Plano to update in case it exists.
     */
    where: PlanoWhereUniqueInput
    /**
     * In case the Plano found by the `where` argument doesn't exist, create a new Plano with this data.
     */
    create: XOR<PlanoCreateInput, PlanoUncheckedCreateInput>
    /**
     * In case the Plano was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanoUpdateInput, PlanoUncheckedUpdateInput>
  }

  /**
   * Plano delete
   */
  export type PlanoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
    /**
     * Filter which Plano to delete.
     */
    where: PlanoWhereUniqueInput
  }

  /**
   * Plano deleteMany
   */
  export type PlanoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Planos to delete
     */
    where?: PlanoWhereInput
    /**
     * Limit how many Planos to delete.
     */
    limit?: number
  }

  /**
   * Plano.empresas
   */
  export type Plano$empresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    cursor?: EmpresaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Plano.assinaturas
   */
  export type Plano$assinaturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    where?: AssinaturaWhereInput
    orderBy?: AssinaturaOrderByWithRelationInput | AssinaturaOrderByWithRelationInput[]
    cursor?: AssinaturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssinaturaScalarFieldEnum | AssinaturaScalarFieldEnum[]
  }

  /**
   * Plano without action
   */
  export type PlanoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plano
     */
    select?: PlanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plano
     */
    omit?: PlanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanoInclude<ExtArgs> | null
  }


  /**
   * Model Assinatura
   */

  export type AggregateAssinatura = {
    _count: AssinaturaCountAggregateOutputType | null
    _min: AssinaturaMinAggregateOutputType | null
    _max: AssinaturaMaxAggregateOutputType | null
  }

  export type AssinaturaMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    periodoFim: Date | null
    planoId: string | null
  }

  export type AssinaturaMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    periodoFim: Date | null
    planoId: string | null
  }

  export type AssinaturaCountAggregateOutputType = {
    id: number
    empresaId: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    periodoFim: number
    planoId: number
    _all: number
  }


  export type AssinaturaMinAggregateInputType = {
    id?: true
    empresaId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    periodoFim?: true
    planoId?: true
  }

  export type AssinaturaMaxAggregateInputType = {
    id?: true
    empresaId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    periodoFim?: true
    planoId?: true
  }

  export type AssinaturaCountAggregateInputType = {
    id?: true
    empresaId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    periodoFim?: true
    planoId?: true
    _all?: true
  }

  export type AssinaturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assinatura to aggregate.
     */
    where?: AssinaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assinaturas to fetch.
     */
    orderBy?: AssinaturaOrderByWithRelationInput | AssinaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssinaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assinaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assinaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assinaturas
    **/
    _count?: true | AssinaturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssinaturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssinaturaMaxAggregateInputType
  }

  export type GetAssinaturaAggregateType<T extends AssinaturaAggregateArgs> = {
        [P in keyof T & keyof AggregateAssinatura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssinatura[P]>
      : GetScalarType<T[P], AggregateAssinatura[P]>
  }




  export type AssinaturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssinaturaWhereInput
    orderBy?: AssinaturaOrderByWithAggregationInput | AssinaturaOrderByWithAggregationInput[]
    by: AssinaturaScalarFieldEnum[] | AssinaturaScalarFieldEnum
    having?: AssinaturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssinaturaCountAggregateInputType | true
    _min?: AssinaturaMinAggregateInputType
    _max?: AssinaturaMaxAggregateInputType
  }

  export type AssinaturaGroupByOutputType = {
    id: string
    empresaId: string
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    periodoFim: Date | null
    planoId: string
    _count: AssinaturaCountAggregateOutputType | null
    _min: AssinaturaMinAggregateOutputType | null
    _max: AssinaturaMaxAggregateOutputType | null
  }

  type GetAssinaturaGroupByPayload<T extends AssinaturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssinaturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssinaturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssinaturaGroupByOutputType[P]>
            : GetScalarType<T[P], AssinaturaGroupByOutputType[P]>
        }
      >
    >


  export type AssinaturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    periodoFim?: boolean
    planoId?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    plano?: boolean | PlanoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assinatura"]>



  export type AssinaturaSelectScalar = {
    id?: boolean
    empresaId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    periodoFim?: boolean
    planoId?: boolean
  }

  export type AssinaturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "stripeCustomerId" | "stripeSubscriptionId" | "periodoFim" | "planoId", ExtArgs["result"]["assinatura"]>
  export type AssinaturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    plano?: boolean | PlanoDefaultArgs<ExtArgs>
  }

  export type $AssinaturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assinatura"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      plano: Prisma.$PlanoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      periodoFim: Date | null
      planoId: string
    }, ExtArgs["result"]["assinatura"]>
    composites: {}
  }

  type AssinaturaGetPayload<S extends boolean | null | undefined | AssinaturaDefaultArgs> = $Result.GetResult<Prisma.$AssinaturaPayload, S>

  type AssinaturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssinaturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssinaturaCountAggregateInputType | true
    }

  export interface AssinaturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assinatura'], meta: { name: 'Assinatura' } }
    /**
     * Find zero or one Assinatura that matches the filter.
     * @param {AssinaturaFindUniqueArgs} args - Arguments to find a Assinatura
     * @example
     * // Get one Assinatura
     * const assinatura = await prisma.assinatura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssinaturaFindUniqueArgs>(args: SelectSubset<T, AssinaturaFindUniqueArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assinatura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssinaturaFindUniqueOrThrowArgs} args - Arguments to find a Assinatura
     * @example
     * // Get one Assinatura
     * const assinatura = await prisma.assinatura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssinaturaFindUniqueOrThrowArgs>(args: SelectSubset<T, AssinaturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assinatura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaFindFirstArgs} args - Arguments to find a Assinatura
     * @example
     * // Get one Assinatura
     * const assinatura = await prisma.assinatura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssinaturaFindFirstArgs>(args?: SelectSubset<T, AssinaturaFindFirstArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assinatura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaFindFirstOrThrowArgs} args - Arguments to find a Assinatura
     * @example
     * // Get one Assinatura
     * const assinatura = await prisma.assinatura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssinaturaFindFirstOrThrowArgs>(args?: SelectSubset<T, AssinaturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assinaturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assinaturas
     * const assinaturas = await prisma.assinatura.findMany()
     * 
     * // Get first 10 Assinaturas
     * const assinaturas = await prisma.assinatura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assinaturaWithIdOnly = await prisma.assinatura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssinaturaFindManyArgs>(args?: SelectSubset<T, AssinaturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assinatura.
     * @param {AssinaturaCreateArgs} args - Arguments to create a Assinatura.
     * @example
     * // Create one Assinatura
     * const Assinatura = await prisma.assinatura.create({
     *   data: {
     *     // ... data to create a Assinatura
     *   }
     * })
     * 
     */
    create<T extends AssinaturaCreateArgs>(args: SelectSubset<T, AssinaturaCreateArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assinaturas.
     * @param {AssinaturaCreateManyArgs} args - Arguments to create many Assinaturas.
     * @example
     * // Create many Assinaturas
     * const assinatura = await prisma.assinatura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssinaturaCreateManyArgs>(args?: SelectSubset<T, AssinaturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assinatura.
     * @param {AssinaturaDeleteArgs} args - Arguments to delete one Assinatura.
     * @example
     * // Delete one Assinatura
     * const Assinatura = await prisma.assinatura.delete({
     *   where: {
     *     // ... filter to delete one Assinatura
     *   }
     * })
     * 
     */
    delete<T extends AssinaturaDeleteArgs>(args: SelectSubset<T, AssinaturaDeleteArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assinatura.
     * @param {AssinaturaUpdateArgs} args - Arguments to update one Assinatura.
     * @example
     * // Update one Assinatura
     * const assinatura = await prisma.assinatura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssinaturaUpdateArgs>(args: SelectSubset<T, AssinaturaUpdateArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assinaturas.
     * @param {AssinaturaDeleteManyArgs} args - Arguments to filter Assinaturas to delete.
     * @example
     * // Delete a few Assinaturas
     * const { count } = await prisma.assinatura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssinaturaDeleteManyArgs>(args?: SelectSubset<T, AssinaturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assinaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assinaturas
     * const assinatura = await prisma.assinatura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssinaturaUpdateManyArgs>(args: SelectSubset<T, AssinaturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assinatura.
     * @param {AssinaturaUpsertArgs} args - Arguments to update or create a Assinatura.
     * @example
     * // Update or create a Assinatura
     * const assinatura = await prisma.assinatura.upsert({
     *   create: {
     *     // ... data to create a Assinatura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assinatura we want to update
     *   }
     * })
     */
    upsert<T extends AssinaturaUpsertArgs>(args: SelectSubset<T, AssinaturaUpsertArgs<ExtArgs>>): Prisma__AssinaturaClient<$Result.GetResult<Prisma.$AssinaturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assinaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaCountArgs} args - Arguments to filter Assinaturas to count.
     * @example
     * // Count the number of Assinaturas
     * const count = await prisma.assinatura.count({
     *   where: {
     *     // ... the filter for the Assinaturas we want to count
     *   }
     * })
    **/
    count<T extends AssinaturaCountArgs>(
      args?: Subset<T, AssinaturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssinaturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assinatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssinaturaAggregateArgs>(args: Subset<T, AssinaturaAggregateArgs>): Prisma.PrismaPromise<GetAssinaturaAggregateType<T>>

    /**
     * Group by Assinatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssinaturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssinaturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssinaturaGroupByArgs['orderBy'] }
        : { orderBy?: AssinaturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssinaturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssinaturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assinatura model
   */
  readonly fields: AssinaturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assinatura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssinaturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plano<T extends PlanoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanoDefaultArgs<ExtArgs>>): Prisma__PlanoClient<$Result.GetResult<Prisma.$PlanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assinatura model
   */
  interface AssinaturaFieldRefs {
    readonly id: FieldRef<"Assinatura", 'String'>
    readonly empresaId: FieldRef<"Assinatura", 'String'>
    readonly stripeCustomerId: FieldRef<"Assinatura", 'String'>
    readonly stripeSubscriptionId: FieldRef<"Assinatura", 'String'>
    readonly periodoFim: FieldRef<"Assinatura", 'DateTime'>
    readonly planoId: FieldRef<"Assinatura", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Assinatura findUnique
   */
  export type AssinaturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter, which Assinatura to fetch.
     */
    where: AssinaturaWhereUniqueInput
  }

  /**
   * Assinatura findUniqueOrThrow
   */
  export type AssinaturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter, which Assinatura to fetch.
     */
    where: AssinaturaWhereUniqueInput
  }

  /**
   * Assinatura findFirst
   */
  export type AssinaturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter, which Assinatura to fetch.
     */
    where?: AssinaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assinaturas to fetch.
     */
    orderBy?: AssinaturaOrderByWithRelationInput | AssinaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assinaturas.
     */
    cursor?: AssinaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assinaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assinaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assinaturas.
     */
    distinct?: AssinaturaScalarFieldEnum | AssinaturaScalarFieldEnum[]
  }

  /**
   * Assinatura findFirstOrThrow
   */
  export type AssinaturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter, which Assinatura to fetch.
     */
    where?: AssinaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assinaturas to fetch.
     */
    orderBy?: AssinaturaOrderByWithRelationInput | AssinaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assinaturas.
     */
    cursor?: AssinaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assinaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assinaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assinaturas.
     */
    distinct?: AssinaturaScalarFieldEnum | AssinaturaScalarFieldEnum[]
  }

  /**
   * Assinatura findMany
   */
  export type AssinaturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter, which Assinaturas to fetch.
     */
    where?: AssinaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assinaturas to fetch.
     */
    orderBy?: AssinaturaOrderByWithRelationInput | AssinaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assinaturas.
     */
    cursor?: AssinaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assinaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assinaturas.
     */
    skip?: number
    distinct?: AssinaturaScalarFieldEnum | AssinaturaScalarFieldEnum[]
  }

  /**
   * Assinatura create
   */
  export type AssinaturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * The data needed to create a Assinatura.
     */
    data: XOR<AssinaturaCreateInput, AssinaturaUncheckedCreateInput>
  }

  /**
   * Assinatura createMany
   */
  export type AssinaturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assinaturas.
     */
    data: AssinaturaCreateManyInput | AssinaturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assinatura update
   */
  export type AssinaturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * The data needed to update a Assinatura.
     */
    data: XOR<AssinaturaUpdateInput, AssinaturaUncheckedUpdateInput>
    /**
     * Choose, which Assinatura to update.
     */
    where: AssinaturaWhereUniqueInput
  }

  /**
   * Assinatura updateMany
   */
  export type AssinaturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assinaturas.
     */
    data: XOR<AssinaturaUpdateManyMutationInput, AssinaturaUncheckedUpdateManyInput>
    /**
     * Filter which Assinaturas to update
     */
    where?: AssinaturaWhereInput
    /**
     * Limit how many Assinaturas to update.
     */
    limit?: number
  }

  /**
   * Assinatura upsert
   */
  export type AssinaturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * The filter to search for the Assinatura to update in case it exists.
     */
    where: AssinaturaWhereUniqueInput
    /**
     * In case the Assinatura found by the `where` argument doesn't exist, create a new Assinatura with this data.
     */
    create: XOR<AssinaturaCreateInput, AssinaturaUncheckedCreateInput>
    /**
     * In case the Assinatura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssinaturaUpdateInput, AssinaturaUncheckedUpdateInput>
  }

  /**
   * Assinatura delete
   */
  export type AssinaturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
    /**
     * Filter which Assinatura to delete.
     */
    where: AssinaturaWhereUniqueInput
  }

  /**
   * Assinatura deleteMany
   */
  export type AssinaturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assinaturas to delete
     */
    where?: AssinaturaWhereInput
    /**
     * Limit how many Assinaturas to delete.
     */
    limit?: number
  }

  /**
   * Assinatura without action
   */
  export type AssinaturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assinatura
     */
    select?: AssinaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assinatura
     */
    omit?: AssinaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssinaturaInclude<ExtArgs> | null
  }


  /**
   * Model Board
   */

  export type AggregateBoard = {
    _count: BoardCountAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  export type BoardMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    titulo: string | null
    createdAt: Date | null
  }

  export type BoardMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    titulo: string | null
    createdAt: Date | null
  }

  export type BoardCountAggregateOutputType = {
    id: number
    empresaId: number
    titulo: number
    createdAt: number
    _all: number
  }


  export type BoardMinAggregateInputType = {
    id?: true
    empresaId?: true
    titulo?: true
    createdAt?: true
  }

  export type BoardMaxAggregateInputType = {
    id?: true
    empresaId?: true
    titulo?: true
    createdAt?: true
  }

  export type BoardCountAggregateInputType = {
    id?: true
    empresaId?: true
    titulo?: true
    createdAt?: true
    _all?: true
  }

  export type BoardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Board to aggregate.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Boards
    **/
    _count?: true | BoardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardMaxAggregateInputType
  }

  export type GetBoardAggregateType<T extends BoardAggregateArgs> = {
        [P in keyof T & keyof AggregateBoard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoard[P]>
      : GetScalarType<T[P], AggregateBoard[P]>
  }




  export type BoardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardWhereInput
    orderBy?: BoardOrderByWithAggregationInput | BoardOrderByWithAggregationInput[]
    by: BoardScalarFieldEnum[] | BoardScalarFieldEnum
    having?: BoardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardCountAggregateInputType | true
    _min?: BoardMinAggregateInputType
    _max?: BoardMaxAggregateInputType
  }

  export type BoardGroupByOutputType = {
    id: string
    empresaId: string
    titulo: string
    createdAt: Date
    _count: BoardCountAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  type GetBoardGroupByPayload<T extends BoardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardGroupByOutputType[P]>
            : GetScalarType<T[P], BoardGroupByOutputType[P]>
        }
      >
    >


  export type BoardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    titulo?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    listas?: boolean | Board$listasArgs<ExtArgs>
    _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["board"]>



  export type BoardSelectScalar = {
    id?: boolean
    empresaId?: boolean
    titulo?: boolean
    createdAt?: boolean
  }

  export type BoardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "titulo" | "createdAt", ExtArgs["result"]["board"]>
  export type BoardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    listas?: boolean | Board$listasArgs<ExtArgs>
    _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BoardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Board"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      listas: Prisma.$PedidoStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      titulo: string
      createdAt: Date
    }, ExtArgs["result"]["board"]>
    composites: {}
  }

  type BoardGetPayload<S extends boolean | null | undefined | BoardDefaultArgs> = $Result.GetResult<Prisma.$BoardPayload, S>

  type BoardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardCountAggregateInputType | true
    }

  export interface BoardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Board'], meta: { name: 'Board' } }
    /**
     * Find zero or one Board that matches the filter.
     * @param {BoardFindUniqueArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardFindUniqueArgs>(args: SelectSubset<T, BoardFindUniqueArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Board that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardFindUniqueOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardFindUniqueOrThrowArgs>(args: SelectSubset<T, BoardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Board that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardFindFirstArgs>(args?: SelectSubset<T, BoardFindFirstArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Board that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardFindFirstOrThrowArgs>(args?: SelectSubset<T, BoardFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Boards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boards
     * const boards = await prisma.board.findMany()
     * 
     * // Get first 10 Boards
     * const boards = await prisma.board.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardWithIdOnly = await prisma.board.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoardFindManyArgs>(args?: SelectSubset<T, BoardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Board.
     * @param {BoardCreateArgs} args - Arguments to create a Board.
     * @example
     * // Create one Board
     * const Board = await prisma.board.create({
     *   data: {
     *     // ... data to create a Board
     *   }
     * })
     * 
     */
    create<T extends BoardCreateArgs>(args: SelectSubset<T, BoardCreateArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Boards.
     * @param {BoardCreateManyArgs} args - Arguments to create many Boards.
     * @example
     * // Create many Boards
     * const board = await prisma.board.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoardCreateManyArgs>(args?: SelectSubset<T, BoardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Board.
     * @param {BoardDeleteArgs} args - Arguments to delete one Board.
     * @example
     * // Delete one Board
     * const Board = await prisma.board.delete({
     *   where: {
     *     // ... filter to delete one Board
     *   }
     * })
     * 
     */
    delete<T extends BoardDeleteArgs>(args: SelectSubset<T, BoardDeleteArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Board.
     * @param {BoardUpdateArgs} args - Arguments to update one Board.
     * @example
     * // Update one Board
     * const board = await prisma.board.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoardUpdateArgs>(args: SelectSubset<T, BoardUpdateArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Boards.
     * @param {BoardDeleteManyArgs} args - Arguments to filter Boards to delete.
     * @example
     * // Delete a few Boards
     * const { count } = await prisma.board.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoardDeleteManyArgs>(args?: SelectSubset<T, BoardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoardUpdateManyArgs>(args: SelectSubset<T, BoardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Board.
     * @param {BoardUpsertArgs} args - Arguments to update or create a Board.
     * @example
     * // Update or create a Board
     * const board = await prisma.board.upsert({
     *   create: {
     *     // ... data to create a Board
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Board we want to update
     *   }
     * })
     */
    upsert<T extends BoardUpsertArgs>(args: SelectSubset<T, BoardUpsertArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCountArgs} args - Arguments to filter Boards to count.
     * @example
     * // Count the number of Boards
     * const count = await prisma.board.count({
     *   where: {
     *     // ... the filter for the Boards we want to count
     *   }
     * })
    **/
    count<T extends BoardCountArgs>(
      args?: Subset<T, BoardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardAggregateArgs>(args: Subset<T, BoardAggregateArgs>): Prisma.PrismaPromise<GetBoardAggregateType<T>>

    /**
     * Group by Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardGroupByArgs['orderBy'] }
        : { orderBy?: BoardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Board model
   */
  readonly fields: BoardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Board.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listas<T extends Board$listasArgs<ExtArgs> = {}>(args?: Subset<T, Board$listasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Board model
   */
  interface BoardFieldRefs {
    readonly id: FieldRef<"Board", 'String'>
    readonly empresaId: FieldRef<"Board", 'String'>
    readonly titulo: FieldRef<"Board", 'String'>
    readonly createdAt: FieldRef<"Board", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Board findUnique
   */
  export type BoardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board findUniqueOrThrow
   */
  export type BoardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board findFirst
   */
  export type BoardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board findFirstOrThrow
   */
  export type BoardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board findMany
   */
  export type BoardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Boards to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board create
   */
  export type BoardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The data needed to create a Board.
     */
    data: XOR<BoardCreateInput, BoardUncheckedCreateInput>
  }

  /**
   * Board createMany
   */
  export type BoardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Boards.
     */
    data: BoardCreateManyInput | BoardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Board update
   */
  export type BoardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The data needed to update a Board.
     */
    data: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
    /**
     * Choose, which Board to update.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board updateMany
   */
  export type BoardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Boards.
     */
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>
    /**
     * Filter which Boards to update
     */
    where?: BoardWhereInput
    /**
     * Limit how many Boards to update.
     */
    limit?: number
  }

  /**
   * Board upsert
   */
  export type BoardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The filter to search for the Board to update in case it exists.
     */
    where: BoardWhereUniqueInput
    /**
     * In case the Board found by the `where` argument doesn't exist, create a new Board with this data.
     */
    create: XOR<BoardCreateInput, BoardUncheckedCreateInput>
    /**
     * In case the Board was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
  }

  /**
   * Board delete
   */
  export type BoardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter which Board to delete.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board deleteMany
   */
  export type BoardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Boards to delete
     */
    where?: BoardWhereInput
    /**
     * Limit how many Boards to delete.
     */
    limit?: number
  }

  /**
   * Board.listas
   */
  export type Board$listasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    where?: PedidoStatusWhereInput
    orderBy?: PedidoStatusOrderByWithRelationInput | PedidoStatusOrderByWithRelationInput[]
    cursor?: PedidoStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoStatusScalarFieldEnum | PedidoStatusScalarFieldEnum[]
  }

  /**
   * Board without action
   */
  export type BoardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
  }


  /**
   * Model PedidoStatus
   */

  export type AggregatePedidoStatus = {
    _count: PedidoStatusCountAggregateOutputType | null
    _avg: PedidoStatusAvgAggregateOutputType | null
    _sum: PedidoStatusSumAggregateOutputType | null
    _min: PedidoStatusMinAggregateOutputType | null
    _max: PedidoStatusMaxAggregateOutputType | null
  }

  export type PedidoStatusAvgAggregateOutputType = {
    ordem: number | null
  }

  export type PedidoStatusSumAggregateOutputType = {
    ordem: number | null
  }

  export type PedidoStatusMinAggregateOutputType = {
    id: string | null
    boardId: string | null
    titulo: string | null
    ordem: number | null
  }

  export type PedidoStatusMaxAggregateOutputType = {
    id: string | null
    boardId: string | null
    titulo: string | null
    ordem: number | null
  }

  export type PedidoStatusCountAggregateOutputType = {
    id: number
    boardId: number
    titulo: number
    ordem: number
    _all: number
  }


  export type PedidoStatusAvgAggregateInputType = {
    ordem?: true
  }

  export type PedidoStatusSumAggregateInputType = {
    ordem?: true
  }

  export type PedidoStatusMinAggregateInputType = {
    id?: true
    boardId?: true
    titulo?: true
    ordem?: true
  }

  export type PedidoStatusMaxAggregateInputType = {
    id?: true
    boardId?: true
    titulo?: true
    ordem?: true
  }

  export type PedidoStatusCountAggregateInputType = {
    id?: true
    boardId?: true
    titulo?: true
    ordem?: true
    _all?: true
  }

  export type PedidoStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoStatus to aggregate.
     */
    where?: PedidoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoStatuses to fetch.
     */
    orderBy?: PedidoStatusOrderByWithRelationInput | PedidoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoStatuses
    **/
    _count?: true | PedidoStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoStatusMaxAggregateInputType
  }

  export type GetPedidoStatusAggregateType<T extends PedidoStatusAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoStatus[P]>
      : GetScalarType<T[P], AggregatePedidoStatus[P]>
  }




  export type PedidoStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoStatusWhereInput
    orderBy?: PedidoStatusOrderByWithAggregationInput | PedidoStatusOrderByWithAggregationInput[]
    by: PedidoStatusScalarFieldEnum[] | PedidoStatusScalarFieldEnum
    having?: PedidoStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoStatusCountAggregateInputType | true
    _avg?: PedidoStatusAvgAggregateInputType
    _sum?: PedidoStatusSumAggregateInputType
    _min?: PedidoStatusMinAggregateInputType
    _max?: PedidoStatusMaxAggregateInputType
  }

  export type PedidoStatusGroupByOutputType = {
    id: string
    boardId: string
    titulo: string
    ordem: number
    _count: PedidoStatusCountAggregateOutputType | null
    _avg: PedidoStatusAvgAggregateOutputType | null
    _sum: PedidoStatusSumAggregateOutputType | null
    _min: PedidoStatusMinAggregateOutputType | null
    _max: PedidoStatusMaxAggregateOutputType | null
  }

  type GetPedidoStatusGroupByPayload<T extends PedidoStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoStatusGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoStatusGroupByOutputType[P]>
        }
      >
    >


  export type PedidoStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    titulo?: boolean
    ordem?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidoStatus$pedidosArgs<ExtArgs>
    logsOrigem?: boolean | PedidoStatus$logsOrigemArgs<ExtArgs>
    logsDestino?: boolean | PedidoStatus$logsDestinoArgs<ExtArgs>
    _count?: boolean | PedidoStatusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoStatus"]>



  export type PedidoStatusSelectScalar = {
    id?: boolean
    boardId?: boolean
    titulo?: boolean
    ordem?: boolean
  }

  export type PedidoStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boardId" | "titulo" | "ordem", ExtArgs["result"]["pedidoStatus"]>
  export type PedidoStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidoStatus$pedidosArgs<ExtArgs>
    logsOrigem?: boolean | PedidoStatus$logsOrigemArgs<ExtArgs>
    logsDestino?: boolean | PedidoStatus$logsDestinoArgs<ExtArgs>
    _count?: boolean | PedidoStatusCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PedidoStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoStatus"
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
      logsOrigem: Prisma.$LogMovimentacaoPayload<ExtArgs>[]
      logsDestino: Prisma.$LogMovimentacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      boardId: string
      titulo: string
      ordem: number
    }, ExtArgs["result"]["pedidoStatus"]>
    composites: {}
  }

  type PedidoStatusGetPayload<S extends boolean | null | undefined | PedidoStatusDefaultArgs> = $Result.GetResult<Prisma.$PedidoStatusPayload, S>

  type PedidoStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoStatusCountAggregateInputType | true
    }

  export interface PedidoStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoStatus'], meta: { name: 'PedidoStatus' } }
    /**
     * Find zero or one PedidoStatus that matches the filter.
     * @param {PedidoStatusFindUniqueArgs} args - Arguments to find a PedidoStatus
     * @example
     * // Get one PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoStatusFindUniqueArgs>(args: SelectSubset<T, PedidoStatusFindUniqueArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PedidoStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoStatusFindUniqueOrThrowArgs} args - Arguments to find a PedidoStatus
     * @example
     * // Get one PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusFindFirstArgs} args - Arguments to find a PedidoStatus
     * @example
     * // Get one PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoStatusFindFirstArgs>(args?: SelectSubset<T, PedidoStatusFindFirstArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusFindFirstOrThrowArgs} args - Arguments to find a PedidoStatus
     * @example
     * // Get one PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PedidoStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoStatuses
     * const pedidoStatuses = await prisma.pedidoStatus.findMany()
     * 
     * // Get first 10 PedidoStatuses
     * const pedidoStatuses = await prisma.pedidoStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoStatusWithIdOnly = await prisma.pedidoStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoStatusFindManyArgs>(args?: SelectSubset<T, PedidoStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PedidoStatus.
     * @param {PedidoStatusCreateArgs} args - Arguments to create a PedidoStatus.
     * @example
     * // Create one PedidoStatus
     * const PedidoStatus = await prisma.pedidoStatus.create({
     *   data: {
     *     // ... data to create a PedidoStatus
     *   }
     * })
     * 
     */
    create<T extends PedidoStatusCreateArgs>(args: SelectSubset<T, PedidoStatusCreateArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PedidoStatuses.
     * @param {PedidoStatusCreateManyArgs} args - Arguments to create many PedidoStatuses.
     * @example
     * // Create many PedidoStatuses
     * const pedidoStatus = await prisma.pedidoStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoStatusCreateManyArgs>(args?: SelectSubset<T, PedidoStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PedidoStatus.
     * @param {PedidoStatusDeleteArgs} args - Arguments to delete one PedidoStatus.
     * @example
     * // Delete one PedidoStatus
     * const PedidoStatus = await prisma.pedidoStatus.delete({
     *   where: {
     *     // ... filter to delete one PedidoStatus
     *   }
     * })
     * 
     */
    delete<T extends PedidoStatusDeleteArgs>(args: SelectSubset<T, PedidoStatusDeleteArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PedidoStatus.
     * @param {PedidoStatusUpdateArgs} args - Arguments to update one PedidoStatus.
     * @example
     * // Update one PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoStatusUpdateArgs>(args: SelectSubset<T, PedidoStatusUpdateArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PedidoStatuses.
     * @param {PedidoStatusDeleteManyArgs} args - Arguments to filter PedidoStatuses to delete.
     * @example
     * // Delete a few PedidoStatuses
     * const { count } = await prisma.pedidoStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoStatusDeleteManyArgs>(args?: SelectSubset<T, PedidoStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoStatuses
     * const pedidoStatus = await prisma.pedidoStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoStatusUpdateManyArgs>(args: SelectSubset<T, PedidoStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PedidoStatus.
     * @param {PedidoStatusUpsertArgs} args - Arguments to update or create a PedidoStatus.
     * @example
     * // Update or create a PedidoStatus
     * const pedidoStatus = await prisma.pedidoStatus.upsert({
     *   create: {
     *     // ... data to create a PedidoStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoStatus we want to update
     *   }
     * })
     */
    upsert<T extends PedidoStatusUpsertArgs>(args: SelectSubset<T, PedidoStatusUpsertArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PedidoStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusCountArgs} args - Arguments to filter PedidoStatuses to count.
     * @example
     * // Count the number of PedidoStatuses
     * const count = await prisma.pedidoStatus.count({
     *   where: {
     *     // ... the filter for the PedidoStatuses we want to count
     *   }
     * })
    **/
    count<T extends PedidoStatusCountArgs>(
      args?: Subset<T, PedidoStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoStatusAggregateArgs>(args: Subset<T, PedidoStatusAggregateArgs>): Prisma.PrismaPromise<GetPedidoStatusAggregateType<T>>

    /**
     * Group by PedidoStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoStatusGroupByArgs['orderBy'] }
        : { orderBy?: PedidoStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoStatus model
   */
  readonly fields: PedidoStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BoardDefaultArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pedidos<T extends PedidoStatus$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, PedidoStatus$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logsOrigem<T extends PedidoStatus$logsOrigemArgs<ExtArgs> = {}>(args?: Subset<T, PedidoStatus$logsOrigemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logsDestino<T extends PedidoStatus$logsDestinoArgs<ExtArgs> = {}>(args?: Subset<T, PedidoStatus$logsDestinoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoStatus model
   */
  interface PedidoStatusFieldRefs {
    readonly id: FieldRef<"PedidoStatus", 'String'>
    readonly boardId: FieldRef<"PedidoStatus", 'String'>
    readonly titulo: FieldRef<"PedidoStatus", 'String'>
    readonly ordem: FieldRef<"PedidoStatus", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PedidoStatus findUnique
   */
  export type PedidoStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter, which PedidoStatus to fetch.
     */
    where: PedidoStatusWhereUniqueInput
  }

  /**
   * PedidoStatus findUniqueOrThrow
   */
  export type PedidoStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter, which PedidoStatus to fetch.
     */
    where: PedidoStatusWhereUniqueInput
  }

  /**
   * PedidoStatus findFirst
   */
  export type PedidoStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter, which PedidoStatus to fetch.
     */
    where?: PedidoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoStatuses to fetch.
     */
    orderBy?: PedidoStatusOrderByWithRelationInput | PedidoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoStatuses.
     */
    cursor?: PedidoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoStatuses.
     */
    distinct?: PedidoStatusScalarFieldEnum | PedidoStatusScalarFieldEnum[]
  }

  /**
   * PedidoStatus findFirstOrThrow
   */
  export type PedidoStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter, which PedidoStatus to fetch.
     */
    where?: PedidoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoStatuses to fetch.
     */
    orderBy?: PedidoStatusOrderByWithRelationInput | PedidoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoStatuses.
     */
    cursor?: PedidoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoStatuses.
     */
    distinct?: PedidoStatusScalarFieldEnum | PedidoStatusScalarFieldEnum[]
  }

  /**
   * PedidoStatus findMany
   */
  export type PedidoStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter, which PedidoStatuses to fetch.
     */
    where?: PedidoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoStatuses to fetch.
     */
    orderBy?: PedidoStatusOrderByWithRelationInput | PedidoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoStatuses.
     */
    cursor?: PedidoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoStatuses.
     */
    skip?: number
    distinct?: PedidoStatusScalarFieldEnum | PedidoStatusScalarFieldEnum[]
  }

  /**
   * PedidoStatus create
   */
  export type PedidoStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoStatus.
     */
    data: XOR<PedidoStatusCreateInput, PedidoStatusUncheckedCreateInput>
  }

  /**
   * PedidoStatus createMany
   */
  export type PedidoStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoStatuses.
     */
    data: PedidoStatusCreateManyInput | PedidoStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoStatus update
   */
  export type PedidoStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoStatus.
     */
    data: XOR<PedidoStatusUpdateInput, PedidoStatusUncheckedUpdateInput>
    /**
     * Choose, which PedidoStatus to update.
     */
    where: PedidoStatusWhereUniqueInput
  }

  /**
   * PedidoStatus updateMany
   */
  export type PedidoStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoStatuses.
     */
    data: XOR<PedidoStatusUpdateManyMutationInput, PedidoStatusUncheckedUpdateManyInput>
    /**
     * Filter which PedidoStatuses to update
     */
    where?: PedidoStatusWhereInput
    /**
     * Limit how many PedidoStatuses to update.
     */
    limit?: number
  }

  /**
   * PedidoStatus upsert
   */
  export type PedidoStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoStatus to update in case it exists.
     */
    where: PedidoStatusWhereUniqueInput
    /**
     * In case the PedidoStatus found by the `where` argument doesn't exist, create a new PedidoStatus with this data.
     */
    create: XOR<PedidoStatusCreateInput, PedidoStatusUncheckedCreateInput>
    /**
     * In case the PedidoStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoStatusUpdateInput, PedidoStatusUncheckedUpdateInput>
  }

  /**
   * PedidoStatus delete
   */
  export type PedidoStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    /**
     * Filter which PedidoStatus to delete.
     */
    where: PedidoStatusWhereUniqueInput
  }

  /**
   * PedidoStatus deleteMany
   */
  export type PedidoStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoStatuses to delete
     */
    where?: PedidoStatusWhereInput
    /**
     * Limit how many PedidoStatuses to delete.
     */
    limit?: number
  }

  /**
   * PedidoStatus.pedidos
   */
  export type PedidoStatus$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * PedidoStatus.logsOrigem
   */
  export type PedidoStatus$logsOrigemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    where?: LogMovimentacaoWhereInput
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    cursor?: LogMovimentacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * PedidoStatus.logsDestino
   */
  export type PedidoStatus$logsDestinoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    where?: LogMovimentacaoWhereInput
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    cursor?: LogMovimentacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * PedidoStatus without action
   */
  export type PedidoStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
  }


  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  export type PedidoAvgAggregateOutputType = {
    desconto: number | null
    taxaEntrega: number | null
    valorTotal: number | null
  }

  export type PedidoSumAggregateOutputType = {
    desconto: number | null
    taxaEntrega: number | null
    valorTotal: number | null
  }

  export type PedidoMinAggregateOutputType = {
    id: string | null
    statusId: string | null
    empresaId: string | null
    codigo: string | null
    fonteId: string | null
    pagamentoId: string | null
    enderecoId: string | null
    desconto: number | null
    taxaEntrega: number | null
    valorTotal: number | null
    observacao: string | null
    criadoEm: Date | null
    concluidoEm: Date | null
  }

  export type PedidoMaxAggregateOutputType = {
    id: string | null
    statusId: string | null
    empresaId: string | null
    codigo: string | null
    fonteId: string | null
    pagamentoId: string | null
    enderecoId: string | null
    desconto: number | null
    taxaEntrega: number | null
    valorTotal: number | null
    observacao: string | null
    criadoEm: Date | null
    concluidoEm: Date | null
  }

  export type PedidoCountAggregateOutputType = {
    id: number
    statusId: number
    empresaId: number
    codigo: number
    fonteId: number
    pagamentoId: number
    enderecoId: number
    desconto: number
    taxaEntrega: number
    valorTotal: number
    observacao: number
    criadoEm: number
    concluidoEm: number
    _all: number
  }


  export type PedidoAvgAggregateInputType = {
    desconto?: true
    taxaEntrega?: true
    valorTotal?: true
  }

  export type PedidoSumAggregateInputType = {
    desconto?: true
    taxaEntrega?: true
    valorTotal?: true
  }

  export type PedidoMinAggregateInputType = {
    id?: true
    statusId?: true
    empresaId?: true
    codigo?: true
    fonteId?: true
    pagamentoId?: true
    enderecoId?: true
    desconto?: true
    taxaEntrega?: true
    valorTotal?: true
    observacao?: true
    criadoEm?: true
    concluidoEm?: true
  }

  export type PedidoMaxAggregateInputType = {
    id?: true
    statusId?: true
    empresaId?: true
    codigo?: true
    fonteId?: true
    pagamentoId?: true
    enderecoId?: true
    desconto?: true
    taxaEntrega?: true
    valorTotal?: true
    observacao?: true
    criadoEm?: true
    concluidoEm?: true
  }

  export type PedidoCountAggregateInputType = {
    id?: true
    statusId?: true
    empresaId?: true
    codigo?: true
    fonteId?: true
    pagamentoId?: true
    enderecoId?: true
    desconto?: true
    taxaEntrega?: true
    valorTotal?: true
    observacao?: true
    criadoEm?: true
    concluidoEm?: true
    _all?: true
  }

  export type PedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoMaxAggregateInputType
  }

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>
  }




  export type PedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[]
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum
    having?: PedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoCountAggregateInputType | true
    _avg?: PedidoAvgAggregateInputType
    _sum?: PedidoSumAggregateInputType
    _min?: PedidoMinAggregateInputType
    _max?: PedidoMaxAggregateInputType
  }

  export type PedidoGroupByOutputType = {
    id: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId: string | null
    desconto: number
    taxaEntrega: number
    valorTotal: number
    observacao: string | null
    criadoEm: Date
    concluidoEm: Date | null
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statusId?: boolean
    empresaId?: boolean
    codigo?: boolean
    fonteId?: boolean
    pagamentoId?: boolean
    enderecoId?: boolean
    desconto?: boolean
    taxaEntrega?: boolean
    valorTotal?: boolean
    observacao?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
    status?: boolean | PedidoStatusDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    itens?: boolean | Pedido$itensArgs<ExtArgs>
    pagamento?: boolean | FormaPagamentoDefaultArgs<ExtArgs>
    endereco?: boolean | Pedido$enderecoArgs<ExtArgs>
    fonte?: boolean | FontePedidoDefaultArgs<ExtArgs>
    logs?: boolean | Pedido$logsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>



  export type PedidoSelectScalar = {
    id?: boolean
    statusId?: boolean
    empresaId?: boolean
    codigo?: boolean
    fonteId?: boolean
    pagamentoId?: boolean
    enderecoId?: boolean
    desconto?: boolean
    taxaEntrega?: boolean
    valorTotal?: boolean
    observacao?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
  }

  export type PedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "statusId" | "empresaId" | "codigo" | "fonteId" | "pagamentoId" | "enderecoId" | "desconto" | "taxaEntrega" | "valorTotal" | "observacao" | "criadoEm" | "concluidoEm", ExtArgs["result"]["pedido"]>
  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    status?: boolean | PedidoStatusDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    itens?: boolean | Pedido$itensArgs<ExtArgs>
    pagamento?: boolean | FormaPagamentoDefaultArgs<ExtArgs>
    endereco?: boolean | Pedido$enderecoArgs<ExtArgs>
    fonte?: boolean | FontePedidoDefaultArgs<ExtArgs>
    logs?: boolean | Pedido$logsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedido"
    objects: {
      status: Prisma.$PedidoStatusPayload<ExtArgs>
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      itens: Prisma.$PedidoItemPayload<ExtArgs>[]
      pagamento: Prisma.$FormaPagamentoPayload<ExtArgs>
      endereco: Prisma.$EnderecoPayload<ExtArgs> | null
      fonte: Prisma.$FontePedidoPayload<ExtArgs>
      logs: Prisma.$LogMovimentacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      statusId: string
      empresaId: string
      codigo: string
      fonteId: string
      pagamentoId: string
      enderecoId: string | null
      desconto: number
      taxaEntrega: number
      valorTotal: number
      observacao: string | null
      criadoEm: Date
      concluidoEm: Date | null
    }, ExtArgs["result"]["pedido"]>
    composites: {}
  }

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> = $Result.GetResult<Prisma.$PedidoPayload, S>

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoCountAggregateInputType | true
    }

  export interface PedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido'], meta: { name: 'Pedido' } }
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoWithIdOnly = await prisma.pedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoFindManyArgs>(args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     * 
     */
    create<T extends PedidoCreateArgs>(args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoCreateManyArgs>(args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     * 
     */
    delete<T extends PedidoDeleteArgs>(args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoUpdateArgs>(args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoDeleteManyArgs>(args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoUpdateManyArgs>(args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoAggregateArgs>(args: Subset<T, PedidoAggregateArgs>): Prisma.PrismaPromise<GetPedidoAggregateType<T>>

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedido model
   */
  readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    status<T extends PedidoStatusDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoStatusDefaultArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itens<T extends Pedido$itensArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagamento<T extends FormaPagamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormaPagamentoDefaultArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    endereco<T extends Pedido$enderecoArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$enderecoArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fonte<T extends FontePedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FontePedidoDefaultArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    logs<T extends Pedido$logsArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedido model
   */
  interface PedidoFieldRefs {
    readonly id: FieldRef<"Pedido", 'String'>
    readonly statusId: FieldRef<"Pedido", 'String'>
    readonly empresaId: FieldRef<"Pedido", 'String'>
    readonly codigo: FieldRef<"Pedido", 'String'>
    readonly fonteId: FieldRef<"Pedido", 'String'>
    readonly pagamentoId: FieldRef<"Pedido", 'String'>
    readonly enderecoId: FieldRef<"Pedido", 'String'>
    readonly desconto: FieldRef<"Pedido", 'Float'>
    readonly taxaEntrega: FieldRef<"Pedido", 'Float'>
    readonly valorTotal: FieldRef<"Pedido", 'Float'>
    readonly observacao: FieldRef<"Pedido", 'String'>
    readonly criadoEm: FieldRef<"Pedido", 'DateTime'>
    readonly concluidoEm: FieldRef<"Pedido", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedido.
     */
    data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
  }

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedido.
     */
    data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
    /**
     * Choose, which Pedido to update.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedido to update in case it exists.
     */
    where: PedidoWhereUniqueInput
    /**
     * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
     */
    create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
    /**
     * In case the Pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
  }

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter which Pedido to delete.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedido.itens
   */
  export type Pedido$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    cursor?: PedidoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * Pedido.endereco
   */
  export type Pedido$enderecoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    where?: EnderecoWhereInput
  }

  /**
   * Pedido.logs
   */
  export type Pedido$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    where?: LogMovimentacaoWhereInput
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    cursor?: LogMovimentacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
  }


  /**
   * Model PedidoItem
   */

  export type AggregatePedidoItem = {
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  export type PedidoItemAvgAggregateOutputType = {
    quantidade: number | null
    precoUnitario: number | null
  }

  export type PedidoItemSumAggregateOutputType = {
    quantidade: number | null
    precoUnitario: number | null
  }

  export type PedidoItemMinAggregateOutputType = {
    id: string | null
    pedidoId: string | null
    produtoId: string | null
    quantidade: number | null
    precoUnitario: number | null
    observacao: string | null
  }

  export type PedidoItemMaxAggregateOutputType = {
    id: string | null
    pedidoId: string | null
    produtoId: string | null
    quantidade: number | null
    precoUnitario: number | null
    observacao: string | null
  }

  export type PedidoItemCountAggregateOutputType = {
    id: number
    pedidoId: number
    produtoId: number
    quantidade: number
    precoUnitario: number
    observacao: number
    _all: number
  }


  export type PedidoItemAvgAggregateInputType = {
    quantidade?: true
    precoUnitario?: true
  }

  export type PedidoItemSumAggregateInputType = {
    quantidade?: true
    precoUnitario?: true
  }

  export type PedidoItemMinAggregateInputType = {
    id?: true
    pedidoId?: true
    produtoId?: true
    quantidade?: true
    precoUnitario?: true
    observacao?: true
  }

  export type PedidoItemMaxAggregateInputType = {
    id?: true
    pedidoId?: true
    produtoId?: true
    quantidade?: true
    precoUnitario?: true
    observacao?: true
  }

  export type PedidoItemCountAggregateInputType = {
    id?: true
    pedidoId?: true
    produtoId?: true
    quantidade?: true
    precoUnitario?: true
    observacao?: true
    _all?: true
  }

  export type PedidoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItem to aggregate.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoItems
    **/
    _count?: true | PedidoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoItemMaxAggregateInputType
  }

  export type GetPedidoItemAggregateType<T extends PedidoItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoItem[P]>
      : GetScalarType<T[P], AggregatePedidoItem[P]>
  }




  export type PedidoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithAggregationInput | PedidoItemOrderByWithAggregationInput[]
    by: PedidoItemScalarFieldEnum[] | PedidoItemScalarFieldEnum
    having?: PedidoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoItemCountAggregateInputType | true
    _avg?: PedidoItemAvgAggregateInputType
    _sum?: PedidoItemSumAggregateInputType
    _min?: PedidoItemMinAggregateInputType
    _max?: PedidoItemMaxAggregateInputType
  }

  export type PedidoItemGroupByOutputType = {
    id: string
    pedidoId: string
    produtoId: string
    quantidade: number
    precoUnitario: number
    observacao: string | null
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  type GetPedidoItemGroupByPayload<T extends PedidoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
        }
      >
    >


  export type PedidoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedidoId?: boolean
    produtoId?: boolean
    quantidade?: boolean
    precoUnitario?: boolean
    observacao?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>



  export type PedidoItemSelectScalar = {
    id?: boolean
    pedidoId?: boolean
    produtoId?: boolean
    quantidade?: boolean
    precoUnitario?: boolean
    observacao?: boolean
  }

  export type PedidoItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedidoId" | "produtoId" | "quantidade" | "precoUnitario" | "observacao", ExtArgs["result"]["pedidoItem"]>
  export type PedidoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $PedidoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoItem"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
      produto: Prisma.$ProdutoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pedidoId: string
      produtoId: string
      quantidade: number
      precoUnitario: number
      observacao: string | null
    }, ExtArgs["result"]["pedidoItem"]>
    composites: {}
  }

  type PedidoItemGetPayload<S extends boolean | null | undefined | PedidoItemDefaultArgs> = $Result.GetResult<Prisma.$PedidoItemPayload, S>

  type PedidoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoItemCountAggregateInputType | true
    }

  export interface PedidoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoItem'], meta: { name: 'PedidoItem' } }
    /**
     * Find zero or one PedidoItem that matches the filter.
     * @param {PedidoItemFindUniqueArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoItemFindUniqueArgs>(args: SelectSubset<T, PedidoItemFindUniqueArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PedidoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoItemFindUniqueOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoItemFindFirstArgs>(args?: SelectSubset<T, PedidoItemFindFirstArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PedidoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany()
     * 
     * // Get first 10 PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoItemWithIdOnly = await prisma.pedidoItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoItemFindManyArgs>(args?: SelectSubset<T, PedidoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PedidoItem.
     * @param {PedidoItemCreateArgs} args - Arguments to create a PedidoItem.
     * @example
     * // Create one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.create({
     *   data: {
     *     // ... data to create a PedidoItem
     *   }
     * })
     * 
     */
    create<T extends PedidoItemCreateArgs>(args: SelectSubset<T, PedidoItemCreateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PedidoItems.
     * @param {PedidoItemCreateManyArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoItemCreateManyArgs>(args?: SelectSubset<T, PedidoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PedidoItem.
     * @param {PedidoItemDeleteArgs} args - Arguments to delete one PedidoItem.
     * @example
     * // Delete one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.delete({
     *   where: {
     *     // ... filter to delete one PedidoItem
     *   }
     * })
     * 
     */
    delete<T extends PedidoItemDeleteArgs>(args: SelectSubset<T, PedidoItemDeleteArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PedidoItem.
     * @param {PedidoItemUpdateArgs} args - Arguments to update one PedidoItem.
     * @example
     * // Update one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoItemUpdateArgs>(args: SelectSubset<T, PedidoItemUpdateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PedidoItems.
     * @param {PedidoItemDeleteManyArgs} args - Arguments to filter PedidoItems to delete.
     * @example
     * // Delete a few PedidoItems
     * const { count } = await prisma.pedidoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoItemDeleteManyArgs>(args?: SelectSubset<T, PedidoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoItemUpdateManyArgs>(args: SelectSubset<T, PedidoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PedidoItem.
     * @param {PedidoItemUpsertArgs} args - Arguments to update or create a PedidoItem.
     * @example
     * // Update or create a PedidoItem
     * const pedidoItem = await prisma.pedidoItem.upsert({
     *   create: {
     *     // ... data to create a PedidoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoItem we want to update
     *   }
     * })
     */
    upsert<T extends PedidoItemUpsertArgs>(args: SelectSubset<T, PedidoItemUpsertArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemCountArgs} args - Arguments to filter PedidoItems to count.
     * @example
     * // Count the number of PedidoItems
     * const count = await prisma.pedidoItem.count({
     *   where: {
     *     // ... the filter for the PedidoItems we want to count
     *   }
     * })
    **/
    count<T extends PedidoItemCountArgs>(
      args?: Subset<T, PedidoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoItemAggregateArgs>(args: Subset<T, PedidoItemAggregateArgs>): Prisma.PrismaPromise<GetPedidoItemAggregateType<T>>

    /**
     * Group by PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoItemGroupByArgs['orderBy'] }
        : { orderBy?: PedidoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoItem model
   */
  readonly fields: PedidoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoItem model
   */
  interface PedidoItemFieldRefs {
    readonly id: FieldRef<"PedidoItem", 'String'>
    readonly pedidoId: FieldRef<"PedidoItem", 'String'>
    readonly produtoId: FieldRef<"PedidoItem", 'String'>
    readonly quantidade: FieldRef<"PedidoItem", 'Int'>
    readonly precoUnitario: FieldRef<"PedidoItem", 'Float'>
    readonly observacao: FieldRef<"PedidoItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PedidoItem findUnique
   */
  export type PedidoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findUniqueOrThrow
   */
  export type PedidoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findFirst
   */
  export type PedidoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findFirstOrThrow
   */
  export type PedidoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findMany
   */
  export type PedidoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItems to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem create
   */
  export type PedidoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoItem.
     */
    data: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
  }

  /**
   * PedidoItem createMany
   */
  export type PedidoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoItem update
   */
  export type PedidoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoItem.
     */
    data: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
    /**
     * Choose, which PedidoItem to update.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem updateMany
   */
  export type PedidoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoItems.
     */
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyInput>
    /**
     * Filter which PedidoItems to update
     */
    where?: PedidoItemWhereInput
    /**
     * Limit how many PedidoItems to update.
     */
    limit?: number
  }

  /**
   * PedidoItem upsert
   */
  export type PedidoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoItem to update in case it exists.
     */
    where: PedidoItemWhereUniqueInput
    /**
     * In case the PedidoItem found by the `where` argument doesn't exist, create a new PedidoItem with this data.
     */
    create: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
    /**
     * In case the PedidoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
  }

  /**
   * PedidoItem delete
   */
  export type PedidoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter which PedidoItem to delete.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem deleteMany
   */
  export type PedidoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItems to delete
     */
    where?: PedidoItemWhereInput
    /**
     * Limit how many PedidoItems to delete.
     */
    limit?: number
  }

  /**
   * PedidoItem without action
   */
  export type PedidoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
  }


  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoAvgAggregateOutputType = {
    precoBase: number | null
  }

  export type ProdutoSumAggregateOutputType = {
    precoBase: number | null
  }

  export type ProdutoMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    descricao: string | null
    precoBase: number | null
    ativo: boolean | null
  }

  export type ProdutoMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    descricao: string | null
    precoBase: number | null
    ativo: boolean | null
  }

  export type ProdutoCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    descricao: number
    precoBase: number
    ativo: number
    _all: number
  }


  export type ProdutoAvgAggregateInputType = {
    precoBase?: true
  }

  export type ProdutoSumAggregateInputType = {
    precoBase?: true
  }

  export type ProdutoMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    descricao?: true
    precoBase?: true
    ativo?: true
  }

  export type ProdutoMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    descricao?: true
    precoBase?: true
    ativo?: true
  }

  export type ProdutoCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    descricao?: true
    precoBase?: true
    ativo?: true
    _all?: true
  }

  export type ProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[]
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _avg?: ProdutoAvgAggregateInputType
    _sum?: ProdutoSumAggregateInputType
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }

  export type ProdutoGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    descricao: string | null
    precoBase: number
    ativo: boolean
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    descricao?: boolean
    precoBase?: boolean
    ativo?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    itensPedido?: boolean | Produto$itensPedidoArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>



  export type ProdutoSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    descricao?: boolean
    precoBase?: boolean
    ativo?: boolean
  }

  export type ProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "descricao" | "precoBase" | "ativo", ExtArgs["result"]["produto"]>
  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    itensPedido?: boolean | Produto$itensPedidoArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produto"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      itensPedido: Prisma.$PedidoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      descricao: string | null
      precoBase: number
      ativo: boolean
    }, ExtArgs["result"]["produto"]>
    composites: {}
  }

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> = $Result.GetResult<Prisma.$ProdutoPayload, S>

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutoCountAggregateInputType | true
    }

  export interface ProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto'], meta: { name: 'Produto' } }
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produtoWithIdOnly = await prisma.produto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProdutoFindManyArgs>(args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
     */
    create<T extends ProdutoCreateArgs>(args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutoCreateManyArgs>(args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
     */
    delete<T extends ProdutoDeleteArgs>(args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutoUpdateArgs>(args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutoUpdateManyArgs>(args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): Prisma.PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produto model
   */
  readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itensPedido<T extends Produto$itensPedidoArgs<ExtArgs> = {}>(args?: Subset<T, Produto$itensPedidoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly id: FieldRef<"Produto", 'String'>
    readonly empresaId: FieldRef<"Produto", 'String'>
    readonly nome: FieldRef<"Produto", 'String'>
    readonly descricao: FieldRef<"Produto", 'String'>
    readonly precoBase: FieldRef<"Produto", 'Float'>
    readonly ativo: FieldRef<"Produto", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produto.itensPedido
   */
  export type Produto$itensPedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    cursor?: PedidoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
  }


  /**
   * Model FormaPagamento
   */

  export type AggregateFormaPagamento = {
    _count: FormaPagamentoCountAggregateOutputType | null
    _min: FormaPagamentoMinAggregateOutputType | null
    _max: FormaPagamentoMaxAggregateOutputType | null
  }

  export type FormaPagamentoMinAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type FormaPagamentoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type FormaPagamentoCountAggregateOutputType = {
    id: number
    nome: number
    _all: number
  }


  export type FormaPagamentoMinAggregateInputType = {
    id?: true
    nome?: true
  }

  export type FormaPagamentoMaxAggregateInputType = {
    id?: true
    nome?: true
  }

  export type FormaPagamentoCountAggregateInputType = {
    id?: true
    nome?: true
    _all?: true
  }

  export type FormaPagamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormaPagamento to aggregate.
     */
    where?: FormaPagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormaPagamentos to fetch.
     */
    orderBy?: FormaPagamentoOrderByWithRelationInput | FormaPagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormaPagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormaPagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormaPagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormaPagamentos
    **/
    _count?: true | FormaPagamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormaPagamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormaPagamentoMaxAggregateInputType
  }

  export type GetFormaPagamentoAggregateType<T extends FormaPagamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateFormaPagamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormaPagamento[P]>
      : GetScalarType<T[P], AggregateFormaPagamento[P]>
  }




  export type FormaPagamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormaPagamentoWhereInput
    orderBy?: FormaPagamentoOrderByWithAggregationInput | FormaPagamentoOrderByWithAggregationInput[]
    by: FormaPagamentoScalarFieldEnum[] | FormaPagamentoScalarFieldEnum
    having?: FormaPagamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormaPagamentoCountAggregateInputType | true
    _min?: FormaPagamentoMinAggregateInputType
    _max?: FormaPagamentoMaxAggregateInputType
  }

  export type FormaPagamentoGroupByOutputType = {
    id: string
    nome: string
    _count: FormaPagamentoCountAggregateOutputType | null
    _min: FormaPagamentoMinAggregateOutputType | null
    _max: FormaPagamentoMaxAggregateOutputType | null
  }

  type GetFormaPagamentoGroupByPayload<T extends FormaPagamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormaPagamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormaPagamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormaPagamentoGroupByOutputType[P]>
            : GetScalarType<T[P], FormaPagamentoGroupByOutputType[P]>
        }
      >
    >


  export type FormaPagamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    pedidos?: boolean | FormaPagamento$pedidosArgs<ExtArgs>
    _count?: boolean | FormaPagamentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formaPagamento"]>



  export type FormaPagamentoSelectScalar = {
    id?: boolean
    nome?: boolean
  }

  export type FormaPagamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome", ExtArgs["result"]["formaPagamento"]>
  export type FormaPagamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | FormaPagamento$pedidosArgs<ExtArgs>
    _count?: boolean | FormaPagamentoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FormaPagamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormaPagamento"
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
    }, ExtArgs["result"]["formaPagamento"]>
    composites: {}
  }

  type FormaPagamentoGetPayload<S extends boolean | null | undefined | FormaPagamentoDefaultArgs> = $Result.GetResult<Prisma.$FormaPagamentoPayload, S>

  type FormaPagamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormaPagamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormaPagamentoCountAggregateInputType | true
    }

  export interface FormaPagamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormaPagamento'], meta: { name: 'FormaPagamento' } }
    /**
     * Find zero or one FormaPagamento that matches the filter.
     * @param {FormaPagamentoFindUniqueArgs} args - Arguments to find a FormaPagamento
     * @example
     * // Get one FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormaPagamentoFindUniqueArgs>(args: SelectSubset<T, FormaPagamentoFindUniqueArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormaPagamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormaPagamentoFindUniqueOrThrowArgs} args - Arguments to find a FormaPagamento
     * @example
     * // Get one FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormaPagamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, FormaPagamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormaPagamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoFindFirstArgs} args - Arguments to find a FormaPagamento
     * @example
     * // Get one FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormaPagamentoFindFirstArgs>(args?: SelectSubset<T, FormaPagamentoFindFirstArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormaPagamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoFindFirstOrThrowArgs} args - Arguments to find a FormaPagamento
     * @example
     * // Get one FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormaPagamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, FormaPagamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormaPagamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormaPagamentos
     * const formaPagamentos = await prisma.formaPagamento.findMany()
     * 
     * // Get first 10 FormaPagamentos
     * const formaPagamentos = await prisma.formaPagamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formaPagamentoWithIdOnly = await prisma.formaPagamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormaPagamentoFindManyArgs>(args?: SelectSubset<T, FormaPagamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormaPagamento.
     * @param {FormaPagamentoCreateArgs} args - Arguments to create a FormaPagamento.
     * @example
     * // Create one FormaPagamento
     * const FormaPagamento = await prisma.formaPagamento.create({
     *   data: {
     *     // ... data to create a FormaPagamento
     *   }
     * })
     * 
     */
    create<T extends FormaPagamentoCreateArgs>(args: SelectSubset<T, FormaPagamentoCreateArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormaPagamentos.
     * @param {FormaPagamentoCreateManyArgs} args - Arguments to create many FormaPagamentos.
     * @example
     * // Create many FormaPagamentos
     * const formaPagamento = await prisma.formaPagamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormaPagamentoCreateManyArgs>(args?: SelectSubset<T, FormaPagamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormaPagamento.
     * @param {FormaPagamentoDeleteArgs} args - Arguments to delete one FormaPagamento.
     * @example
     * // Delete one FormaPagamento
     * const FormaPagamento = await prisma.formaPagamento.delete({
     *   where: {
     *     // ... filter to delete one FormaPagamento
     *   }
     * })
     * 
     */
    delete<T extends FormaPagamentoDeleteArgs>(args: SelectSubset<T, FormaPagamentoDeleteArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormaPagamento.
     * @param {FormaPagamentoUpdateArgs} args - Arguments to update one FormaPagamento.
     * @example
     * // Update one FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormaPagamentoUpdateArgs>(args: SelectSubset<T, FormaPagamentoUpdateArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormaPagamentos.
     * @param {FormaPagamentoDeleteManyArgs} args - Arguments to filter FormaPagamentos to delete.
     * @example
     * // Delete a few FormaPagamentos
     * const { count } = await prisma.formaPagamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormaPagamentoDeleteManyArgs>(args?: SelectSubset<T, FormaPagamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormaPagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormaPagamentos
     * const formaPagamento = await prisma.formaPagamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormaPagamentoUpdateManyArgs>(args: SelectSubset<T, FormaPagamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormaPagamento.
     * @param {FormaPagamentoUpsertArgs} args - Arguments to update or create a FormaPagamento.
     * @example
     * // Update or create a FormaPagamento
     * const formaPagamento = await prisma.formaPagamento.upsert({
     *   create: {
     *     // ... data to create a FormaPagamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormaPagamento we want to update
     *   }
     * })
     */
    upsert<T extends FormaPagamentoUpsertArgs>(args: SelectSubset<T, FormaPagamentoUpsertArgs<ExtArgs>>): Prisma__FormaPagamentoClient<$Result.GetResult<Prisma.$FormaPagamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormaPagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoCountArgs} args - Arguments to filter FormaPagamentos to count.
     * @example
     * // Count the number of FormaPagamentos
     * const count = await prisma.formaPagamento.count({
     *   where: {
     *     // ... the filter for the FormaPagamentos we want to count
     *   }
     * })
    **/
    count<T extends FormaPagamentoCountArgs>(
      args?: Subset<T, FormaPagamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormaPagamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormaPagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormaPagamentoAggregateArgs>(args: Subset<T, FormaPagamentoAggregateArgs>): Prisma.PrismaPromise<GetFormaPagamentoAggregateType<T>>

    /**
     * Group by FormaPagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormaPagamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormaPagamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormaPagamentoGroupByArgs['orderBy'] }
        : { orderBy?: FormaPagamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormaPagamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormaPagamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormaPagamento model
   */
  readonly fields: FormaPagamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormaPagamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormaPagamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends FormaPagamento$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, FormaPagamento$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FormaPagamento model
   */
  interface FormaPagamentoFieldRefs {
    readonly id: FieldRef<"FormaPagamento", 'String'>
    readonly nome: FieldRef<"FormaPagamento", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FormaPagamento findUnique
   */
  export type FormaPagamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter, which FormaPagamento to fetch.
     */
    where: FormaPagamentoWhereUniqueInput
  }

  /**
   * FormaPagamento findUniqueOrThrow
   */
  export type FormaPagamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter, which FormaPagamento to fetch.
     */
    where: FormaPagamentoWhereUniqueInput
  }

  /**
   * FormaPagamento findFirst
   */
  export type FormaPagamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter, which FormaPagamento to fetch.
     */
    where?: FormaPagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormaPagamentos to fetch.
     */
    orderBy?: FormaPagamentoOrderByWithRelationInput | FormaPagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormaPagamentos.
     */
    cursor?: FormaPagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormaPagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormaPagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormaPagamentos.
     */
    distinct?: FormaPagamentoScalarFieldEnum | FormaPagamentoScalarFieldEnum[]
  }

  /**
   * FormaPagamento findFirstOrThrow
   */
  export type FormaPagamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter, which FormaPagamento to fetch.
     */
    where?: FormaPagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormaPagamentos to fetch.
     */
    orderBy?: FormaPagamentoOrderByWithRelationInput | FormaPagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormaPagamentos.
     */
    cursor?: FormaPagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormaPagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormaPagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormaPagamentos.
     */
    distinct?: FormaPagamentoScalarFieldEnum | FormaPagamentoScalarFieldEnum[]
  }

  /**
   * FormaPagamento findMany
   */
  export type FormaPagamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter, which FormaPagamentos to fetch.
     */
    where?: FormaPagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormaPagamentos to fetch.
     */
    orderBy?: FormaPagamentoOrderByWithRelationInput | FormaPagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormaPagamentos.
     */
    cursor?: FormaPagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormaPagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormaPagamentos.
     */
    skip?: number
    distinct?: FormaPagamentoScalarFieldEnum | FormaPagamentoScalarFieldEnum[]
  }

  /**
   * FormaPagamento create
   */
  export type FormaPagamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a FormaPagamento.
     */
    data: XOR<FormaPagamentoCreateInput, FormaPagamentoUncheckedCreateInput>
  }

  /**
   * FormaPagamento createMany
   */
  export type FormaPagamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormaPagamentos.
     */
    data: FormaPagamentoCreateManyInput | FormaPagamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormaPagamento update
   */
  export type FormaPagamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a FormaPagamento.
     */
    data: XOR<FormaPagamentoUpdateInput, FormaPagamentoUncheckedUpdateInput>
    /**
     * Choose, which FormaPagamento to update.
     */
    where: FormaPagamentoWhereUniqueInput
  }

  /**
   * FormaPagamento updateMany
   */
  export type FormaPagamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormaPagamentos.
     */
    data: XOR<FormaPagamentoUpdateManyMutationInput, FormaPagamentoUncheckedUpdateManyInput>
    /**
     * Filter which FormaPagamentos to update
     */
    where?: FormaPagamentoWhereInput
    /**
     * Limit how many FormaPagamentos to update.
     */
    limit?: number
  }

  /**
   * FormaPagamento upsert
   */
  export type FormaPagamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the FormaPagamento to update in case it exists.
     */
    where: FormaPagamentoWhereUniqueInput
    /**
     * In case the FormaPagamento found by the `where` argument doesn't exist, create a new FormaPagamento with this data.
     */
    create: XOR<FormaPagamentoCreateInput, FormaPagamentoUncheckedCreateInput>
    /**
     * In case the FormaPagamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormaPagamentoUpdateInput, FormaPagamentoUncheckedUpdateInput>
  }

  /**
   * FormaPagamento delete
   */
  export type FormaPagamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
    /**
     * Filter which FormaPagamento to delete.
     */
    where: FormaPagamentoWhereUniqueInput
  }

  /**
   * FormaPagamento deleteMany
   */
  export type FormaPagamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormaPagamentos to delete
     */
    where?: FormaPagamentoWhereInput
    /**
     * Limit how many FormaPagamentos to delete.
     */
    limit?: number
  }

  /**
   * FormaPagamento.pedidos
   */
  export type FormaPagamento$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * FormaPagamento without action
   */
  export type FormaPagamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormaPagamento
     */
    select?: FormaPagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormaPagamento
     */
    omit?: FormaPagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormaPagamentoInclude<ExtArgs> | null
  }


  /**
   * Model FontePedido
   */

  export type AggregateFontePedido = {
    _count: FontePedidoCountAggregateOutputType | null
    _min: FontePedidoMinAggregateOutputType | null
    _max: FontePedidoMaxAggregateOutputType | null
  }

  export type FontePedidoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    tipoIntegracao: string | null
  }

  export type FontePedidoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    tipoIntegracao: string | null
  }

  export type FontePedidoCountAggregateOutputType = {
    id: number
    nome: number
    tipoIntegracao: number
    _all: number
  }


  export type FontePedidoMinAggregateInputType = {
    id?: true
    nome?: true
    tipoIntegracao?: true
  }

  export type FontePedidoMaxAggregateInputType = {
    id?: true
    nome?: true
    tipoIntegracao?: true
  }

  export type FontePedidoCountAggregateInputType = {
    id?: true
    nome?: true
    tipoIntegracao?: true
    _all?: true
  }

  export type FontePedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontePedido to aggregate.
     */
    where?: FontePedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontePedidos to fetch.
     */
    orderBy?: FontePedidoOrderByWithRelationInput | FontePedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FontePedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontePedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontePedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FontePedidos
    **/
    _count?: true | FontePedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FontePedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FontePedidoMaxAggregateInputType
  }

  export type GetFontePedidoAggregateType<T extends FontePedidoAggregateArgs> = {
        [P in keyof T & keyof AggregateFontePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFontePedido[P]>
      : GetScalarType<T[P], AggregateFontePedido[P]>
  }




  export type FontePedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FontePedidoWhereInput
    orderBy?: FontePedidoOrderByWithAggregationInput | FontePedidoOrderByWithAggregationInput[]
    by: FontePedidoScalarFieldEnum[] | FontePedidoScalarFieldEnum
    having?: FontePedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FontePedidoCountAggregateInputType | true
    _min?: FontePedidoMinAggregateInputType
    _max?: FontePedidoMaxAggregateInputType
  }

  export type FontePedidoGroupByOutputType = {
    id: string
    nome: string
    tipoIntegracao: string | null
    _count: FontePedidoCountAggregateOutputType | null
    _min: FontePedidoMinAggregateOutputType | null
    _max: FontePedidoMaxAggregateOutputType | null
  }

  type GetFontePedidoGroupByPayload<T extends FontePedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FontePedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FontePedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FontePedidoGroupByOutputType[P]>
            : GetScalarType<T[P], FontePedidoGroupByOutputType[P]>
        }
      >
    >


  export type FontePedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    tipoIntegracao?: boolean
    pedidos?: boolean | FontePedido$pedidosArgs<ExtArgs>
    _count?: boolean | FontePedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fontePedido"]>



  export type FontePedidoSelectScalar = {
    id?: boolean
    nome?: boolean
    tipoIntegracao?: boolean
  }

  export type FontePedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "tipoIntegracao", ExtArgs["result"]["fontePedido"]>
  export type FontePedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | FontePedido$pedidosArgs<ExtArgs>
    _count?: boolean | FontePedidoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FontePedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FontePedido"
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      tipoIntegracao: string | null
    }, ExtArgs["result"]["fontePedido"]>
    composites: {}
  }

  type FontePedidoGetPayload<S extends boolean | null | undefined | FontePedidoDefaultArgs> = $Result.GetResult<Prisma.$FontePedidoPayload, S>

  type FontePedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FontePedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FontePedidoCountAggregateInputType | true
    }

  export interface FontePedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FontePedido'], meta: { name: 'FontePedido' } }
    /**
     * Find zero or one FontePedido that matches the filter.
     * @param {FontePedidoFindUniqueArgs} args - Arguments to find a FontePedido
     * @example
     * // Get one FontePedido
     * const fontePedido = await prisma.fontePedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FontePedidoFindUniqueArgs>(args: SelectSubset<T, FontePedidoFindUniqueArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FontePedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FontePedidoFindUniqueOrThrowArgs} args - Arguments to find a FontePedido
     * @example
     * // Get one FontePedido
     * const fontePedido = await prisma.fontePedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FontePedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, FontePedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontePedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoFindFirstArgs} args - Arguments to find a FontePedido
     * @example
     * // Get one FontePedido
     * const fontePedido = await prisma.fontePedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FontePedidoFindFirstArgs>(args?: SelectSubset<T, FontePedidoFindFirstArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontePedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoFindFirstOrThrowArgs} args - Arguments to find a FontePedido
     * @example
     * // Get one FontePedido
     * const fontePedido = await prisma.fontePedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FontePedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, FontePedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FontePedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FontePedidos
     * const fontePedidos = await prisma.fontePedido.findMany()
     * 
     * // Get first 10 FontePedidos
     * const fontePedidos = await prisma.fontePedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fontePedidoWithIdOnly = await prisma.fontePedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FontePedidoFindManyArgs>(args?: SelectSubset<T, FontePedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FontePedido.
     * @param {FontePedidoCreateArgs} args - Arguments to create a FontePedido.
     * @example
     * // Create one FontePedido
     * const FontePedido = await prisma.fontePedido.create({
     *   data: {
     *     // ... data to create a FontePedido
     *   }
     * })
     * 
     */
    create<T extends FontePedidoCreateArgs>(args: SelectSubset<T, FontePedidoCreateArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FontePedidos.
     * @param {FontePedidoCreateManyArgs} args - Arguments to create many FontePedidos.
     * @example
     * // Create many FontePedidos
     * const fontePedido = await prisma.fontePedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FontePedidoCreateManyArgs>(args?: SelectSubset<T, FontePedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FontePedido.
     * @param {FontePedidoDeleteArgs} args - Arguments to delete one FontePedido.
     * @example
     * // Delete one FontePedido
     * const FontePedido = await prisma.fontePedido.delete({
     *   where: {
     *     // ... filter to delete one FontePedido
     *   }
     * })
     * 
     */
    delete<T extends FontePedidoDeleteArgs>(args: SelectSubset<T, FontePedidoDeleteArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FontePedido.
     * @param {FontePedidoUpdateArgs} args - Arguments to update one FontePedido.
     * @example
     * // Update one FontePedido
     * const fontePedido = await prisma.fontePedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FontePedidoUpdateArgs>(args: SelectSubset<T, FontePedidoUpdateArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FontePedidos.
     * @param {FontePedidoDeleteManyArgs} args - Arguments to filter FontePedidos to delete.
     * @example
     * // Delete a few FontePedidos
     * const { count } = await prisma.fontePedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FontePedidoDeleteManyArgs>(args?: SelectSubset<T, FontePedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FontePedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FontePedidos
     * const fontePedido = await prisma.fontePedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FontePedidoUpdateManyArgs>(args: SelectSubset<T, FontePedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FontePedido.
     * @param {FontePedidoUpsertArgs} args - Arguments to update or create a FontePedido.
     * @example
     * // Update or create a FontePedido
     * const fontePedido = await prisma.fontePedido.upsert({
     *   create: {
     *     // ... data to create a FontePedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FontePedido we want to update
     *   }
     * })
     */
    upsert<T extends FontePedidoUpsertArgs>(args: SelectSubset<T, FontePedidoUpsertArgs<ExtArgs>>): Prisma__FontePedidoClient<$Result.GetResult<Prisma.$FontePedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FontePedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoCountArgs} args - Arguments to filter FontePedidos to count.
     * @example
     * // Count the number of FontePedidos
     * const count = await prisma.fontePedido.count({
     *   where: {
     *     // ... the filter for the FontePedidos we want to count
     *   }
     * })
    **/
    count<T extends FontePedidoCountArgs>(
      args?: Subset<T, FontePedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FontePedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FontePedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FontePedidoAggregateArgs>(args: Subset<T, FontePedidoAggregateArgs>): Prisma.PrismaPromise<GetFontePedidoAggregateType<T>>

    /**
     * Group by FontePedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontePedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FontePedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FontePedidoGroupByArgs['orderBy'] }
        : { orderBy?: FontePedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FontePedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFontePedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FontePedido model
   */
  readonly fields: FontePedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FontePedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FontePedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends FontePedido$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, FontePedido$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FontePedido model
   */
  interface FontePedidoFieldRefs {
    readonly id: FieldRef<"FontePedido", 'String'>
    readonly nome: FieldRef<"FontePedido", 'String'>
    readonly tipoIntegracao: FieldRef<"FontePedido", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FontePedido findUnique
   */
  export type FontePedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter, which FontePedido to fetch.
     */
    where: FontePedidoWhereUniqueInput
  }

  /**
   * FontePedido findUniqueOrThrow
   */
  export type FontePedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter, which FontePedido to fetch.
     */
    where: FontePedidoWhereUniqueInput
  }

  /**
   * FontePedido findFirst
   */
  export type FontePedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter, which FontePedido to fetch.
     */
    where?: FontePedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontePedidos to fetch.
     */
    orderBy?: FontePedidoOrderByWithRelationInput | FontePedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontePedidos.
     */
    cursor?: FontePedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontePedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontePedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontePedidos.
     */
    distinct?: FontePedidoScalarFieldEnum | FontePedidoScalarFieldEnum[]
  }

  /**
   * FontePedido findFirstOrThrow
   */
  export type FontePedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter, which FontePedido to fetch.
     */
    where?: FontePedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontePedidos to fetch.
     */
    orderBy?: FontePedidoOrderByWithRelationInput | FontePedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontePedidos.
     */
    cursor?: FontePedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontePedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontePedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontePedidos.
     */
    distinct?: FontePedidoScalarFieldEnum | FontePedidoScalarFieldEnum[]
  }

  /**
   * FontePedido findMany
   */
  export type FontePedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter, which FontePedidos to fetch.
     */
    where?: FontePedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontePedidos to fetch.
     */
    orderBy?: FontePedidoOrderByWithRelationInput | FontePedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FontePedidos.
     */
    cursor?: FontePedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontePedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontePedidos.
     */
    skip?: number
    distinct?: FontePedidoScalarFieldEnum | FontePedidoScalarFieldEnum[]
  }

  /**
   * FontePedido create
   */
  export type FontePedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a FontePedido.
     */
    data: XOR<FontePedidoCreateInput, FontePedidoUncheckedCreateInput>
  }

  /**
   * FontePedido createMany
   */
  export type FontePedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FontePedidos.
     */
    data: FontePedidoCreateManyInput | FontePedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FontePedido update
   */
  export type FontePedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a FontePedido.
     */
    data: XOR<FontePedidoUpdateInput, FontePedidoUncheckedUpdateInput>
    /**
     * Choose, which FontePedido to update.
     */
    where: FontePedidoWhereUniqueInput
  }

  /**
   * FontePedido updateMany
   */
  export type FontePedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FontePedidos.
     */
    data: XOR<FontePedidoUpdateManyMutationInput, FontePedidoUncheckedUpdateManyInput>
    /**
     * Filter which FontePedidos to update
     */
    where?: FontePedidoWhereInput
    /**
     * Limit how many FontePedidos to update.
     */
    limit?: number
  }

  /**
   * FontePedido upsert
   */
  export type FontePedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the FontePedido to update in case it exists.
     */
    where: FontePedidoWhereUniqueInput
    /**
     * In case the FontePedido found by the `where` argument doesn't exist, create a new FontePedido with this data.
     */
    create: XOR<FontePedidoCreateInput, FontePedidoUncheckedCreateInput>
    /**
     * In case the FontePedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FontePedidoUpdateInput, FontePedidoUncheckedUpdateInput>
  }

  /**
   * FontePedido delete
   */
  export type FontePedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
    /**
     * Filter which FontePedido to delete.
     */
    where: FontePedidoWhereUniqueInput
  }

  /**
   * FontePedido deleteMany
   */
  export type FontePedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontePedidos to delete
     */
    where?: FontePedidoWhereInput
    /**
     * Limit how many FontePedidos to delete.
     */
    limit?: number
  }

  /**
   * FontePedido.pedidos
   */
  export type FontePedido$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * FontePedido without action
   */
  export type FontePedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontePedido
     */
    select?: FontePedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontePedido
     */
    omit?: FontePedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontePedidoInclude<ExtArgs> | null
  }


  /**
   * Model Endereco
   */

  export type AggregateEndereco = {
    _count: EnderecoCountAggregateOutputType | null
    _min: EnderecoMinAggregateOutputType | null
    _max: EnderecoMaxAggregateOutputType | null
  }

  export type EnderecoMinAggregateOutputType = {
    id: string | null
    rua: string | null
    numero: string | null
    complemento: string | null
    bairro: string | null
    cidade: string | null
    uf: string | null
    cep: string | null
    referencia: string | null
  }

  export type EnderecoMaxAggregateOutputType = {
    id: string | null
    rua: string | null
    numero: string | null
    complemento: string | null
    bairro: string | null
    cidade: string | null
    uf: string | null
    cep: string | null
    referencia: string | null
  }

  export type EnderecoCountAggregateOutputType = {
    id: number
    rua: number
    numero: number
    complemento: number
    bairro: number
    cidade: number
    uf: number
    cep: number
    referencia: number
    _all: number
  }


  export type EnderecoMinAggregateInputType = {
    id?: true
    rua?: true
    numero?: true
    complemento?: true
    bairro?: true
    cidade?: true
    uf?: true
    cep?: true
    referencia?: true
  }

  export type EnderecoMaxAggregateInputType = {
    id?: true
    rua?: true
    numero?: true
    complemento?: true
    bairro?: true
    cidade?: true
    uf?: true
    cep?: true
    referencia?: true
  }

  export type EnderecoCountAggregateInputType = {
    id?: true
    rua?: true
    numero?: true
    complemento?: true
    bairro?: true
    cidade?: true
    uf?: true
    cep?: true
    referencia?: true
    _all?: true
  }

  export type EnderecoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endereco to aggregate.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enderecos
    **/
    _count?: true | EnderecoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnderecoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnderecoMaxAggregateInputType
  }

  export type GetEnderecoAggregateType<T extends EnderecoAggregateArgs> = {
        [P in keyof T & keyof AggregateEndereco]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEndereco[P]>
      : GetScalarType<T[P], AggregateEndereco[P]>
  }




  export type EnderecoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnderecoWhereInput
    orderBy?: EnderecoOrderByWithAggregationInput | EnderecoOrderByWithAggregationInput[]
    by: EnderecoScalarFieldEnum[] | EnderecoScalarFieldEnum
    having?: EnderecoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnderecoCountAggregateInputType | true
    _min?: EnderecoMinAggregateInputType
    _max?: EnderecoMaxAggregateInputType
  }

  export type EnderecoGroupByOutputType = {
    id: string
    rua: string
    numero: string
    complemento: string | null
    bairro: string
    cidade: string
    uf: string
    cep: string | null
    referencia: string | null
    _count: EnderecoCountAggregateOutputType | null
    _min: EnderecoMinAggregateOutputType | null
    _max: EnderecoMaxAggregateOutputType | null
  }

  type GetEnderecoGroupByPayload<T extends EnderecoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnderecoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnderecoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnderecoGroupByOutputType[P]>
            : GetScalarType<T[P], EnderecoGroupByOutputType[P]>
        }
      >
    >


  export type EnderecoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rua?: boolean
    numero?: boolean
    complemento?: boolean
    bairro?: boolean
    cidade?: boolean
    uf?: boolean
    cep?: boolean
    referencia?: boolean
    pedidos?: boolean | Endereco$pedidosArgs<ExtArgs>
    _count?: boolean | EnderecoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endereco"]>



  export type EnderecoSelectScalar = {
    id?: boolean
    rua?: boolean
    numero?: boolean
    complemento?: boolean
    bairro?: boolean
    cidade?: boolean
    uf?: boolean
    cep?: boolean
    referencia?: boolean
  }

  export type EnderecoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rua" | "numero" | "complemento" | "bairro" | "cidade" | "uf" | "cep" | "referencia", ExtArgs["result"]["endereco"]>
  export type EnderecoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | Endereco$pedidosArgs<ExtArgs>
    _count?: boolean | EnderecoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EnderecoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Endereco"
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rua: string
      numero: string
      complemento: string | null
      bairro: string
      cidade: string
      uf: string
      cep: string | null
      referencia: string | null
    }, ExtArgs["result"]["endereco"]>
    composites: {}
  }

  type EnderecoGetPayload<S extends boolean | null | undefined | EnderecoDefaultArgs> = $Result.GetResult<Prisma.$EnderecoPayload, S>

  type EnderecoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnderecoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnderecoCountAggregateInputType | true
    }

  export interface EnderecoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Endereco'], meta: { name: 'Endereco' } }
    /**
     * Find zero or one Endereco that matches the filter.
     * @param {EnderecoFindUniqueArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnderecoFindUniqueArgs>(args: SelectSubset<T, EnderecoFindUniqueArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Endereco that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnderecoFindUniqueOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnderecoFindUniqueOrThrowArgs>(args: SelectSubset<T, EnderecoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endereco that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnderecoFindFirstArgs>(args?: SelectSubset<T, EnderecoFindFirstArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endereco that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnderecoFindFirstOrThrowArgs>(args?: SelectSubset<T, EnderecoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enderecos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enderecos
     * const enderecos = await prisma.endereco.findMany()
     * 
     * // Get first 10 Enderecos
     * const enderecos = await prisma.endereco.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enderecoWithIdOnly = await prisma.endereco.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnderecoFindManyArgs>(args?: SelectSubset<T, EnderecoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Endereco.
     * @param {EnderecoCreateArgs} args - Arguments to create a Endereco.
     * @example
     * // Create one Endereco
     * const Endereco = await prisma.endereco.create({
     *   data: {
     *     // ... data to create a Endereco
     *   }
     * })
     * 
     */
    create<T extends EnderecoCreateArgs>(args: SelectSubset<T, EnderecoCreateArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enderecos.
     * @param {EnderecoCreateManyArgs} args - Arguments to create many Enderecos.
     * @example
     * // Create many Enderecos
     * const endereco = await prisma.endereco.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnderecoCreateManyArgs>(args?: SelectSubset<T, EnderecoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Endereco.
     * @param {EnderecoDeleteArgs} args - Arguments to delete one Endereco.
     * @example
     * // Delete one Endereco
     * const Endereco = await prisma.endereco.delete({
     *   where: {
     *     // ... filter to delete one Endereco
     *   }
     * })
     * 
     */
    delete<T extends EnderecoDeleteArgs>(args: SelectSubset<T, EnderecoDeleteArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Endereco.
     * @param {EnderecoUpdateArgs} args - Arguments to update one Endereco.
     * @example
     * // Update one Endereco
     * const endereco = await prisma.endereco.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnderecoUpdateArgs>(args: SelectSubset<T, EnderecoUpdateArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enderecos.
     * @param {EnderecoDeleteManyArgs} args - Arguments to filter Enderecos to delete.
     * @example
     * // Delete a few Enderecos
     * const { count } = await prisma.endereco.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnderecoDeleteManyArgs>(args?: SelectSubset<T, EnderecoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enderecos
     * const endereco = await prisma.endereco.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnderecoUpdateManyArgs>(args: SelectSubset<T, EnderecoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Endereco.
     * @param {EnderecoUpsertArgs} args - Arguments to update or create a Endereco.
     * @example
     * // Update or create a Endereco
     * const endereco = await prisma.endereco.upsert({
     *   create: {
     *     // ... data to create a Endereco
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Endereco we want to update
     *   }
     * })
     */
    upsert<T extends EnderecoUpsertArgs>(args: SelectSubset<T, EnderecoUpsertArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoCountArgs} args - Arguments to filter Enderecos to count.
     * @example
     * // Count the number of Enderecos
     * const count = await prisma.endereco.count({
     *   where: {
     *     // ... the filter for the Enderecos we want to count
     *   }
     * })
    **/
    count<T extends EnderecoCountArgs>(
      args?: Subset<T, EnderecoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnderecoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnderecoAggregateArgs>(args: Subset<T, EnderecoAggregateArgs>): Prisma.PrismaPromise<GetEnderecoAggregateType<T>>

    /**
     * Group by Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnderecoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnderecoGroupByArgs['orderBy'] }
        : { orderBy?: EnderecoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnderecoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnderecoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Endereco model
   */
  readonly fields: EnderecoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Endereco.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnderecoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends Endereco$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Endereco$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Endereco model
   */
  interface EnderecoFieldRefs {
    readonly id: FieldRef<"Endereco", 'String'>
    readonly rua: FieldRef<"Endereco", 'String'>
    readonly numero: FieldRef<"Endereco", 'String'>
    readonly complemento: FieldRef<"Endereco", 'String'>
    readonly bairro: FieldRef<"Endereco", 'String'>
    readonly cidade: FieldRef<"Endereco", 'String'>
    readonly uf: FieldRef<"Endereco", 'String'>
    readonly cep: FieldRef<"Endereco", 'String'>
    readonly referencia: FieldRef<"Endereco", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Endereco findUnique
   */
  export type EnderecoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco findUniqueOrThrow
   */
  export type EnderecoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco findFirst
   */
  export type EnderecoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco findFirstOrThrow
   */
  export type EnderecoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco findMany
   */
  export type EnderecoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Enderecos to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco create
   */
  export type EnderecoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The data needed to create a Endereco.
     */
    data: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>
  }

  /**
   * Endereco createMany
   */
  export type EnderecoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enderecos.
     */
    data: EnderecoCreateManyInput | EnderecoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Endereco update
   */
  export type EnderecoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The data needed to update a Endereco.
     */
    data: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>
    /**
     * Choose, which Endereco to update.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco updateMany
   */
  export type EnderecoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enderecos.
     */
    data: XOR<EnderecoUpdateManyMutationInput, EnderecoUncheckedUpdateManyInput>
    /**
     * Filter which Enderecos to update
     */
    where?: EnderecoWhereInput
    /**
     * Limit how many Enderecos to update.
     */
    limit?: number
  }

  /**
   * Endereco upsert
   */
  export type EnderecoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The filter to search for the Endereco to update in case it exists.
     */
    where: EnderecoWhereUniqueInput
    /**
     * In case the Endereco found by the `where` argument doesn't exist, create a new Endereco with this data.
     */
    create: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>
    /**
     * In case the Endereco was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>
  }

  /**
   * Endereco delete
   */
  export type EnderecoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter which Endereco to delete.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco deleteMany
   */
  export type EnderecoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enderecos to delete
     */
    where?: EnderecoWhereInput
    /**
     * Limit how many Enderecos to delete.
     */
    limit?: number
  }

  /**
   * Endereco.pedidos
   */
  export type Endereco$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Endereco without action
   */
  export type EnderecoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
  }


  /**
   * Model LogMovimentacao
   */

  export type AggregateLogMovimentacao = {
    _count: LogMovimentacaoCountAggregateOutputType | null
    _min: LogMovimentacaoMinAggregateOutputType | null
    _max: LogMovimentacaoMaxAggregateOutputType | null
  }

  export type LogMovimentacaoMinAggregateOutputType = {
    id: string | null
    pedidoId: string | null
    deStatusId: string | null
    paraStatusId: string | null
    dataMovimentacao: Date | null
  }

  export type LogMovimentacaoMaxAggregateOutputType = {
    id: string | null
    pedidoId: string | null
    deStatusId: string | null
    paraStatusId: string | null
    dataMovimentacao: Date | null
  }

  export type LogMovimentacaoCountAggregateOutputType = {
    id: number
    pedidoId: number
    deStatusId: number
    paraStatusId: number
    dataMovimentacao: number
    _all: number
  }


  export type LogMovimentacaoMinAggregateInputType = {
    id?: true
    pedidoId?: true
    deStatusId?: true
    paraStatusId?: true
    dataMovimentacao?: true
  }

  export type LogMovimentacaoMaxAggregateInputType = {
    id?: true
    pedidoId?: true
    deStatusId?: true
    paraStatusId?: true
    dataMovimentacao?: true
  }

  export type LogMovimentacaoCountAggregateInputType = {
    id?: true
    pedidoId?: true
    deStatusId?: true
    paraStatusId?: true
    dataMovimentacao?: true
    _all?: true
  }

  export type LogMovimentacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogMovimentacao to aggregate.
     */
    where?: LogMovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogMovimentacaos to fetch.
     */
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogMovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogMovimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogMovimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogMovimentacaos
    **/
    _count?: true | LogMovimentacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogMovimentacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogMovimentacaoMaxAggregateInputType
  }

  export type GetLogMovimentacaoAggregateType<T extends LogMovimentacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateLogMovimentacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogMovimentacao[P]>
      : GetScalarType<T[P], AggregateLogMovimentacao[P]>
  }




  export type LogMovimentacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogMovimentacaoWhereInput
    orderBy?: LogMovimentacaoOrderByWithAggregationInput | LogMovimentacaoOrderByWithAggregationInput[]
    by: LogMovimentacaoScalarFieldEnum[] | LogMovimentacaoScalarFieldEnum
    having?: LogMovimentacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogMovimentacaoCountAggregateInputType | true
    _min?: LogMovimentacaoMinAggregateInputType
    _max?: LogMovimentacaoMaxAggregateInputType
  }

  export type LogMovimentacaoGroupByOutputType = {
    id: string
    pedidoId: string
    deStatusId: string | null
    paraStatusId: string
    dataMovimentacao: Date
    _count: LogMovimentacaoCountAggregateOutputType | null
    _min: LogMovimentacaoMinAggregateOutputType | null
    _max: LogMovimentacaoMaxAggregateOutputType | null
  }

  type GetLogMovimentacaoGroupByPayload<T extends LogMovimentacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogMovimentacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogMovimentacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogMovimentacaoGroupByOutputType[P]>
            : GetScalarType<T[P], LogMovimentacaoGroupByOutputType[P]>
        }
      >
    >


  export type LogMovimentacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedidoId?: boolean
    deStatusId?: boolean
    paraStatusId?: boolean
    dataMovimentacao?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
    deStatus?: boolean | LogMovimentacao$deStatusArgs<ExtArgs>
    paraStatus?: boolean | PedidoStatusDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["logMovimentacao"]>



  export type LogMovimentacaoSelectScalar = {
    id?: boolean
    pedidoId?: boolean
    deStatusId?: boolean
    paraStatusId?: boolean
    dataMovimentacao?: boolean
  }

  export type LogMovimentacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedidoId" | "deStatusId" | "paraStatusId" | "dataMovimentacao", ExtArgs["result"]["logMovimentacao"]>
  export type LogMovimentacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
    deStatus?: boolean | LogMovimentacao$deStatusArgs<ExtArgs>
    paraStatus?: boolean | PedidoStatusDefaultArgs<ExtArgs>
  }

  export type $LogMovimentacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogMovimentacao"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
      deStatus: Prisma.$PedidoStatusPayload<ExtArgs> | null
      paraStatus: Prisma.$PedidoStatusPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pedidoId: string
      deStatusId: string | null
      paraStatusId: string
      dataMovimentacao: Date
    }, ExtArgs["result"]["logMovimentacao"]>
    composites: {}
  }

  type LogMovimentacaoGetPayload<S extends boolean | null | undefined | LogMovimentacaoDefaultArgs> = $Result.GetResult<Prisma.$LogMovimentacaoPayload, S>

  type LogMovimentacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogMovimentacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogMovimentacaoCountAggregateInputType | true
    }

  export interface LogMovimentacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogMovimentacao'], meta: { name: 'LogMovimentacao' } }
    /**
     * Find zero or one LogMovimentacao that matches the filter.
     * @param {LogMovimentacaoFindUniqueArgs} args - Arguments to find a LogMovimentacao
     * @example
     * // Get one LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogMovimentacaoFindUniqueArgs>(args: SelectSubset<T, LogMovimentacaoFindUniqueArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LogMovimentacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogMovimentacaoFindUniqueOrThrowArgs} args - Arguments to find a LogMovimentacao
     * @example
     * // Get one LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogMovimentacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, LogMovimentacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogMovimentacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoFindFirstArgs} args - Arguments to find a LogMovimentacao
     * @example
     * // Get one LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogMovimentacaoFindFirstArgs>(args?: SelectSubset<T, LogMovimentacaoFindFirstArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogMovimentacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoFindFirstOrThrowArgs} args - Arguments to find a LogMovimentacao
     * @example
     * // Get one LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogMovimentacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, LogMovimentacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LogMovimentacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogMovimentacaos
     * const logMovimentacaos = await prisma.logMovimentacao.findMany()
     * 
     * // Get first 10 LogMovimentacaos
     * const logMovimentacaos = await prisma.logMovimentacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logMovimentacaoWithIdOnly = await prisma.logMovimentacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogMovimentacaoFindManyArgs>(args?: SelectSubset<T, LogMovimentacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LogMovimentacao.
     * @param {LogMovimentacaoCreateArgs} args - Arguments to create a LogMovimentacao.
     * @example
     * // Create one LogMovimentacao
     * const LogMovimentacao = await prisma.logMovimentacao.create({
     *   data: {
     *     // ... data to create a LogMovimentacao
     *   }
     * })
     * 
     */
    create<T extends LogMovimentacaoCreateArgs>(args: SelectSubset<T, LogMovimentacaoCreateArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LogMovimentacaos.
     * @param {LogMovimentacaoCreateManyArgs} args - Arguments to create many LogMovimentacaos.
     * @example
     * // Create many LogMovimentacaos
     * const logMovimentacao = await prisma.logMovimentacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogMovimentacaoCreateManyArgs>(args?: SelectSubset<T, LogMovimentacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LogMovimentacao.
     * @param {LogMovimentacaoDeleteArgs} args - Arguments to delete one LogMovimentacao.
     * @example
     * // Delete one LogMovimentacao
     * const LogMovimentacao = await prisma.logMovimentacao.delete({
     *   where: {
     *     // ... filter to delete one LogMovimentacao
     *   }
     * })
     * 
     */
    delete<T extends LogMovimentacaoDeleteArgs>(args: SelectSubset<T, LogMovimentacaoDeleteArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LogMovimentacao.
     * @param {LogMovimentacaoUpdateArgs} args - Arguments to update one LogMovimentacao.
     * @example
     * // Update one LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogMovimentacaoUpdateArgs>(args: SelectSubset<T, LogMovimentacaoUpdateArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LogMovimentacaos.
     * @param {LogMovimentacaoDeleteManyArgs} args - Arguments to filter LogMovimentacaos to delete.
     * @example
     * // Delete a few LogMovimentacaos
     * const { count } = await prisma.logMovimentacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogMovimentacaoDeleteManyArgs>(args?: SelectSubset<T, LogMovimentacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogMovimentacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogMovimentacaos
     * const logMovimentacao = await prisma.logMovimentacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogMovimentacaoUpdateManyArgs>(args: SelectSubset<T, LogMovimentacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LogMovimentacao.
     * @param {LogMovimentacaoUpsertArgs} args - Arguments to update or create a LogMovimentacao.
     * @example
     * // Update or create a LogMovimentacao
     * const logMovimentacao = await prisma.logMovimentacao.upsert({
     *   create: {
     *     // ... data to create a LogMovimentacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogMovimentacao we want to update
     *   }
     * })
     */
    upsert<T extends LogMovimentacaoUpsertArgs>(args: SelectSubset<T, LogMovimentacaoUpsertArgs<ExtArgs>>): Prisma__LogMovimentacaoClient<$Result.GetResult<Prisma.$LogMovimentacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LogMovimentacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoCountArgs} args - Arguments to filter LogMovimentacaos to count.
     * @example
     * // Count the number of LogMovimentacaos
     * const count = await prisma.logMovimentacao.count({
     *   where: {
     *     // ... the filter for the LogMovimentacaos we want to count
     *   }
     * })
    **/
    count<T extends LogMovimentacaoCountArgs>(
      args?: Subset<T, LogMovimentacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogMovimentacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogMovimentacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogMovimentacaoAggregateArgs>(args: Subset<T, LogMovimentacaoAggregateArgs>): Prisma.PrismaPromise<GetLogMovimentacaoAggregateType<T>>

    /**
     * Group by LogMovimentacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogMovimentacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogMovimentacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogMovimentacaoGroupByArgs['orderBy'] }
        : { orderBy?: LogMovimentacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogMovimentacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogMovimentacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogMovimentacao model
   */
  readonly fields: LogMovimentacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogMovimentacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogMovimentacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deStatus<T extends LogMovimentacao$deStatusArgs<ExtArgs> = {}>(args?: Subset<T, LogMovimentacao$deStatusArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    paraStatus<T extends PedidoStatusDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoStatusDefaultArgs<ExtArgs>>): Prisma__PedidoStatusClient<$Result.GetResult<Prisma.$PedidoStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LogMovimentacao model
   */
  interface LogMovimentacaoFieldRefs {
    readonly id: FieldRef<"LogMovimentacao", 'String'>
    readonly pedidoId: FieldRef<"LogMovimentacao", 'String'>
    readonly deStatusId: FieldRef<"LogMovimentacao", 'String'>
    readonly paraStatusId: FieldRef<"LogMovimentacao", 'String'>
    readonly dataMovimentacao: FieldRef<"LogMovimentacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LogMovimentacao findUnique
   */
  export type LogMovimentacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which LogMovimentacao to fetch.
     */
    where: LogMovimentacaoWhereUniqueInput
  }

  /**
   * LogMovimentacao findUniqueOrThrow
   */
  export type LogMovimentacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which LogMovimentacao to fetch.
     */
    where: LogMovimentacaoWhereUniqueInput
  }

  /**
   * LogMovimentacao findFirst
   */
  export type LogMovimentacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which LogMovimentacao to fetch.
     */
    where?: LogMovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogMovimentacaos to fetch.
     */
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogMovimentacaos.
     */
    cursor?: LogMovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogMovimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogMovimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogMovimentacaos.
     */
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * LogMovimentacao findFirstOrThrow
   */
  export type LogMovimentacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which LogMovimentacao to fetch.
     */
    where?: LogMovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogMovimentacaos to fetch.
     */
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogMovimentacaos.
     */
    cursor?: LogMovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogMovimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogMovimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogMovimentacaos.
     */
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * LogMovimentacao findMany
   */
  export type LogMovimentacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which LogMovimentacaos to fetch.
     */
    where?: LogMovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogMovimentacaos to fetch.
     */
    orderBy?: LogMovimentacaoOrderByWithRelationInput | LogMovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogMovimentacaos.
     */
    cursor?: LogMovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogMovimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogMovimentacaos.
     */
    skip?: number
    distinct?: LogMovimentacaoScalarFieldEnum | LogMovimentacaoScalarFieldEnum[]
  }

  /**
   * LogMovimentacao create
   */
  export type LogMovimentacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a LogMovimentacao.
     */
    data: XOR<LogMovimentacaoCreateInput, LogMovimentacaoUncheckedCreateInput>
  }

  /**
   * LogMovimentacao createMany
   */
  export type LogMovimentacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogMovimentacaos.
     */
    data: LogMovimentacaoCreateManyInput | LogMovimentacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogMovimentacao update
   */
  export type LogMovimentacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a LogMovimentacao.
     */
    data: XOR<LogMovimentacaoUpdateInput, LogMovimentacaoUncheckedUpdateInput>
    /**
     * Choose, which LogMovimentacao to update.
     */
    where: LogMovimentacaoWhereUniqueInput
  }

  /**
   * LogMovimentacao updateMany
   */
  export type LogMovimentacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogMovimentacaos.
     */
    data: XOR<LogMovimentacaoUpdateManyMutationInput, LogMovimentacaoUncheckedUpdateManyInput>
    /**
     * Filter which LogMovimentacaos to update
     */
    where?: LogMovimentacaoWhereInput
    /**
     * Limit how many LogMovimentacaos to update.
     */
    limit?: number
  }

  /**
   * LogMovimentacao upsert
   */
  export type LogMovimentacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the LogMovimentacao to update in case it exists.
     */
    where: LogMovimentacaoWhereUniqueInput
    /**
     * In case the LogMovimentacao found by the `where` argument doesn't exist, create a new LogMovimentacao with this data.
     */
    create: XOR<LogMovimentacaoCreateInput, LogMovimentacaoUncheckedCreateInput>
    /**
     * In case the LogMovimentacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogMovimentacaoUpdateInput, LogMovimentacaoUncheckedUpdateInput>
  }

  /**
   * LogMovimentacao delete
   */
  export type LogMovimentacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
    /**
     * Filter which LogMovimentacao to delete.
     */
    where: LogMovimentacaoWhereUniqueInput
  }

  /**
   * LogMovimentacao deleteMany
   */
  export type LogMovimentacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogMovimentacaos to delete
     */
    where?: LogMovimentacaoWhereInput
    /**
     * Limit how many LogMovimentacaos to delete.
     */
    limit?: number
  }

  /**
   * LogMovimentacao.deStatus
   */
  export type LogMovimentacao$deStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoStatus
     */
    select?: PedidoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoStatus
     */
    omit?: PedidoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoStatusInclude<ExtArgs> | null
    where?: PedidoStatusWhereInput
  }

  /**
   * LogMovimentacao without action
   */
  export type LogMovimentacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogMovimentacao
     */
    select?: LogMovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogMovimentacao
     */
    omit?: LogMovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogMovimentacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmpresaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnpj: 'cnpj',
    email: 'email',
    telefone: 'telefone',
    planoAtualId: 'planoAtualId',
    criadaEm: 'criadaEm'
  };

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    email: 'email',
    senhaHash: 'senhaHash',
    role: 'role'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const PlanoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    limitePedidosMes: 'limitePedidosMes',
    precoMensal: 'precoMensal',
    ativo: 'ativo'
  };

  export type PlanoScalarFieldEnum = (typeof PlanoScalarFieldEnum)[keyof typeof PlanoScalarFieldEnum]


  export const AssinaturaScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    periodoFim: 'periodoFim',
    planoId: 'planoId'
  };

  export type AssinaturaScalarFieldEnum = (typeof AssinaturaScalarFieldEnum)[keyof typeof AssinaturaScalarFieldEnum]


  export const BoardScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    titulo: 'titulo',
    createdAt: 'createdAt'
  };

  export type BoardScalarFieldEnum = (typeof BoardScalarFieldEnum)[keyof typeof BoardScalarFieldEnum]


  export const PedidoStatusScalarFieldEnum: {
    id: 'id',
    boardId: 'boardId',
    titulo: 'titulo',
    ordem: 'ordem'
  };

  export type PedidoStatusScalarFieldEnum = (typeof PedidoStatusScalarFieldEnum)[keyof typeof PedidoStatusScalarFieldEnum]


  export const PedidoScalarFieldEnum: {
    id: 'id',
    statusId: 'statusId',
    empresaId: 'empresaId',
    codigo: 'codigo',
    fonteId: 'fonteId',
    pagamentoId: 'pagamentoId',
    enderecoId: 'enderecoId',
    desconto: 'desconto',
    taxaEntrega: 'taxaEntrega',
    valorTotal: 'valorTotal',
    observacao: 'observacao',
    criadoEm: 'criadoEm',
    concluidoEm: 'concluidoEm'
  };

  export type PedidoScalarFieldEnum = (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum]


  export const PedidoItemScalarFieldEnum: {
    id: 'id',
    pedidoId: 'pedidoId',
    produtoId: 'produtoId',
    quantidade: 'quantidade',
    precoUnitario: 'precoUnitario',
    observacao: 'observacao'
  };

  export type PedidoItemScalarFieldEnum = (typeof PedidoItemScalarFieldEnum)[keyof typeof PedidoItemScalarFieldEnum]


  export const ProdutoScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    descricao: 'descricao',
    precoBase: 'precoBase',
    ativo: 'ativo'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const FormaPagamentoScalarFieldEnum: {
    id: 'id',
    nome: 'nome'
  };

  export type FormaPagamentoScalarFieldEnum = (typeof FormaPagamentoScalarFieldEnum)[keyof typeof FormaPagamentoScalarFieldEnum]


  export const FontePedidoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    tipoIntegracao: 'tipoIntegracao'
  };

  export type FontePedidoScalarFieldEnum = (typeof FontePedidoScalarFieldEnum)[keyof typeof FontePedidoScalarFieldEnum]


  export const EnderecoScalarFieldEnum: {
    id: 'id',
    rua: 'rua',
    numero: 'numero',
    complemento: 'complemento',
    bairro: 'bairro',
    cidade: 'cidade',
    uf: 'uf',
    cep: 'cep',
    referencia: 'referencia'
  };

  export type EnderecoScalarFieldEnum = (typeof EnderecoScalarFieldEnum)[keyof typeof EnderecoScalarFieldEnum]


  export const LogMovimentacaoScalarFieldEnum: {
    id: 'id',
    pedidoId: 'pedidoId',
    deStatusId: 'deStatusId',
    paraStatusId: 'paraStatusId',
    dataMovimentacao: 'dataMovimentacao'
  };

  export type LogMovimentacaoScalarFieldEnum = (typeof LogMovimentacaoScalarFieldEnum)[keyof typeof LogMovimentacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const EmpresaOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnpj: 'cnpj',
    email: 'email',
    telefone: 'telefone',
    planoAtualId: 'planoAtualId'
  };

  export type EmpresaOrderByRelevanceFieldEnum = (typeof EmpresaOrderByRelevanceFieldEnum)[keyof typeof EmpresaOrderByRelevanceFieldEnum]


  export const UsuarioOrderByRelevanceFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    email: 'email',
    senhaHash: 'senhaHash'
  };

  export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum]


  export const PlanoOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome'
  };

  export type PlanoOrderByRelevanceFieldEnum = (typeof PlanoOrderByRelevanceFieldEnum)[keyof typeof PlanoOrderByRelevanceFieldEnum]


  export const AssinaturaOrderByRelevanceFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    planoId: 'planoId'
  };

  export type AssinaturaOrderByRelevanceFieldEnum = (typeof AssinaturaOrderByRelevanceFieldEnum)[keyof typeof AssinaturaOrderByRelevanceFieldEnum]


  export const BoardOrderByRelevanceFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    titulo: 'titulo'
  };

  export type BoardOrderByRelevanceFieldEnum = (typeof BoardOrderByRelevanceFieldEnum)[keyof typeof BoardOrderByRelevanceFieldEnum]


  export const PedidoStatusOrderByRelevanceFieldEnum: {
    id: 'id',
    boardId: 'boardId',
    titulo: 'titulo'
  };

  export type PedidoStatusOrderByRelevanceFieldEnum = (typeof PedidoStatusOrderByRelevanceFieldEnum)[keyof typeof PedidoStatusOrderByRelevanceFieldEnum]


  export const PedidoOrderByRelevanceFieldEnum: {
    id: 'id',
    statusId: 'statusId',
    empresaId: 'empresaId',
    codigo: 'codigo',
    fonteId: 'fonteId',
    pagamentoId: 'pagamentoId',
    enderecoId: 'enderecoId',
    observacao: 'observacao'
  };

  export type PedidoOrderByRelevanceFieldEnum = (typeof PedidoOrderByRelevanceFieldEnum)[keyof typeof PedidoOrderByRelevanceFieldEnum]


  export const PedidoItemOrderByRelevanceFieldEnum: {
    id: 'id',
    pedidoId: 'pedidoId',
    produtoId: 'produtoId',
    observacao: 'observacao'
  };

  export type PedidoItemOrderByRelevanceFieldEnum = (typeof PedidoItemOrderByRelevanceFieldEnum)[keyof typeof PedidoItemOrderByRelevanceFieldEnum]


  export const ProdutoOrderByRelevanceFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type ProdutoOrderByRelevanceFieldEnum = (typeof ProdutoOrderByRelevanceFieldEnum)[keyof typeof ProdutoOrderByRelevanceFieldEnum]


  export const FormaPagamentoOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome'
  };

  export type FormaPagamentoOrderByRelevanceFieldEnum = (typeof FormaPagamentoOrderByRelevanceFieldEnum)[keyof typeof FormaPagamentoOrderByRelevanceFieldEnum]


  export const FontePedidoOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    tipoIntegracao: 'tipoIntegracao'
  };

  export type FontePedidoOrderByRelevanceFieldEnum = (typeof FontePedidoOrderByRelevanceFieldEnum)[keyof typeof FontePedidoOrderByRelevanceFieldEnum]


  export const EnderecoOrderByRelevanceFieldEnum: {
    id: 'id',
    rua: 'rua',
    numero: 'numero',
    complemento: 'complemento',
    bairro: 'bairro',
    cidade: 'cidade',
    uf: 'uf',
    cep: 'cep',
    referencia: 'referencia'
  };

  export type EnderecoOrderByRelevanceFieldEnum = (typeof EnderecoOrderByRelevanceFieldEnum)[keyof typeof EnderecoOrderByRelevanceFieldEnum]


  export const LogMovimentacaoOrderByRelevanceFieldEnum: {
    id: 'id',
    pedidoId: 'pedidoId',
    deStatusId: 'deStatusId',
    paraStatusId: 'paraStatusId'
  };

  export type LogMovimentacaoOrderByRelevanceFieldEnum = (typeof LogMovimentacaoOrderByRelevanceFieldEnum)[keyof typeof LogMovimentacaoOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: StringFilter<"Empresa"> | string
    nome?: StringFilter<"Empresa"> | string
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    telefone?: StringNullableFilter<"Empresa"> | string | null
    planoAtualId?: StringFilter<"Empresa"> | string
    criadaEm?: DateTimeFilter<"Empresa"> | Date | string
    plano?: XOR<PlanoScalarRelationFilter, PlanoWhereInput>
    usuarios?: UsuarioListRelationFilter
    boards?: BoardListRelationFilter
    pedidos?: PedidoListRelationFilter
    produtos?: ProdutoListRelationFilter
    assinatura?: XOR<AssinaturaNullableScalarRelationFilter, AssinaturaWhereInput> | null
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    planoAtualId?: SortOrder
    criadaEm?: SortOrder
    plano?: PlanoOrderByWithRelationInput
    usuarios?: UsuarioOrderByRelationAggregateInput
    boards?: BoardOrderByRelationAggregateInput
    pedidos?: PedidoOrderByRelationAggregateInput
    produtos?: ProdutoOrderByRelationAggregateInput
    assinatura?: AssinaturaOrderByWithRelationInput
    _relevance?: EmpresaOrderByRelevanceInput
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    nome?: StringFilter<"Empresa"> | string
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    telefone?: StringNullableFilter<"Empresa"> | string | null
    planoAtualId?: StringFilter<"Empresa"> | string
    criadaEm?: DateTimeFilter<"Empresa"> | Date | string
    plano?: XOR<PlanoScalarRelationFilter, PlanoWhereInput>
    usuarios?: UsuarioListRelationFilter
    boards?: BoardListRelationFilter
    pedidos?: PedidoListRelationFilter
    produtos?: ProdutoListRelationFilter
    assinatura?: XOR<AssinaturaNullableScalarRelationFilter, AssinaturaWhereInput> | null
  }, "id">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    planoAtualId?: SortOrder
    criadaEm?: SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Empresa"> | string
    nome?: StringWithAggregatesFilter<"Empresa"> | string
    cnpj?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    email?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    telefone?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    planoAtualId?: StringWithAggregatesFilter<"Empresa"> | string
    criadaEm?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    empresaId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    role?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    _relevance?: UsuarioOrderByRelevanceInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    empresaId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    role?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    empresaId?: StringWithAggregatesFilter<"Usuario"> | string
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senhaHash?: StringWithAggregatesFilter<"Usuario"> | string
    role?: EnumRoleWithAggregatesFilter<"Usuario"> | $Enums.Role
  }

  export type PlanoWhereInput = {
    AND?: PlanoWhereInput | PlanoWhereInput[]
    OR?: PlanoWhereInput[]
    NOT?: PlanoWhereInput | PlanoWhereInput[]
    id?: StringFilter<"Plano"> | string
    nome?: StringFilter<"Plano"> | string
    limitePedidosMes?: IntFilter<"Plano"> | number
    precoMensal?: FloatFilter<"Plano"> | number
    ativo?: BoolFilter<"Plano"> | boolean
    empresas?: EmpresaListRelationFilter
    assinaturas?: AssinaturaListRelationFilter
  }

  export type PlanoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
    ativo?: SortOrder
    empresas?: EmpresaOrderByRelationAggregateInput
    assinaturas?: AssinaturaOrderByRelationAggregateInput
    _relevance?: PlanoOrderByRelevanceInput
  }

  export type PlanoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanoWhereInput | PlanoWhereInput[]
    OR?: PlanoWhereInput[]
    NOT?: PlanoWhereInput | PlanoWhereInput[]
    nome?: StringFilter<"Plano"> | string
    limitePedidosMes?: IntFilter<"Plano"> | number
    precoMensal?: FloatFilter<"Plano"> | number
    ativo?: BoolFilter<"Plano"> | boolean
    empresas?: EmpresaListRelationFilter
    assinaturas?: AssinaturaListRelationFilter
  }, "id">

  export type PlanoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
    ativo?: SortOrder
    _count?: PlanoCountOrderByAggregateInput
    _avg?: PlanoAvgOrderByAggregateInput
    _max?: PlanoMaxOrderByAggregateInput
    _min?: PlanoMinOrderByAggregateInput
    _sum?: PlanoSumOrderByAggregateInput
  }

  export type PlanoScalarWhereWithAggregatesInput = {
    AND?: PlanoScalarWhereWithAggregatesInput | PlanoScalarWhereWithAggregatesInput[]
    OR?: PlanoScalarWhereWithAggregatesInput[]
    NOT?: PlanoScalarWhereWithAggregatesInput | PlanoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plano"> | string
    nome?: StringWithAggregatesFilter<"Plano"> | string
    limitePedidosMes?: IntWithAggregatesFilter<"Plano"> | number
    precoMensal?: FloatWithAggregatesFilter<"Plano"> | number
    ativo?: BoolWithAggregatesFilter<"Plano"> | boolean
  }

  export type AssinaturaWhereInput = {
    AND?: AssinaturaWhereInput | AssinaturaWhereInput[]
    OR?: AssinaturaWhereInput[]
    NOT?: AssinaturaWhereInput | AssinaturaWhereInput[]
    id?: StringFilter<"Assinatura"> | string
    empresaId?: StringFilter<"Assinatura"> | string
    stripeCustomerId?: StringNullableFilter<"Assinatura"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Assinatura"> | string | null
    periodoFim?: DateTimeNullableFilter<"Assinatura"> | Date | string | null
    planoId?: StringFilter<"Assinatura"> | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    plano?: XOR<PlanoScalarRelationFilter, PlanoWhereInput>
  }

  export type AssinaturaOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    periodoFim?: SortOrderInput | SortOrder
    planoId?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    plano?: PlanoOrderByWithRelationInput
    _relevance?: AssinaturaOrderByRelevanceInput
  }

  export type AssinaturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId?: string
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    AND?: AssinaturaWhereInput | AssinaturaWhereInput[]
    OR?: AssinaturaWhereInput[]
    NOT?: AssinaturaWhereInput | AssinaturaWhereInput[]
    periodoFim?: DateTimeNullableFilter<"Assinatura"> | Date | string | null
    planoId?: StringFilter<"Assinatura"> | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    plano?: XOR<PlanoScalarRelationFilter, PlanoWhereInput>
  }, "id" | "empresaId" | "stripeCustomerId" | "stripeSubscriptionId">

  export type AssinaturaOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    periodoFim?: SortOrderInput | SortOrder
    planoId?: SortOrder
    _count?: AssinaturaCountOrderByAggregateInput
    _max?: AssinaturaMaxOrderByAggregateInput
    _min?: AssinaturaMinOrderByAggregateInput
  }

  export type AssinaturaScalarWhereWithAggregatesInput = {
    AND?: AssinaturaScalarWhereWithAggregatesInput | AssinaturaScalarWhereWithAggregatesInput[]
    OR?: AssinaturaScalarWhereWithAggregatesInput[]
    NOT?: AssinaturaScalarWhereWithAggregatesInput | AssinaturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assinatura"> | string
    empresaId?: StringWithAggregatesFilter<"Assinatura"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Assinatura"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Assinatura"> | string | null
    periodoFim?: DateTimeNullableWithAggregatesFilter<"Assinatura"> | Date | string | null
    planoId?: StringWithAggregatesFilter<"Assinatura"> | string
  }

  export type BoardWhereInput = {
    AND?: BoardWhereInput | BoardWhereInput[]
    OR?: BoardWhereInput[]
    NOT?: BoardWhereInput | BoardWhereInput[]
    id?: StringFilter<"Board"> | string
    empresaId?: StringFilter<"Board"> | string
    titulo?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    listas?: PedidoStatusListRelationFilter
  }

  export type BoardOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    titulo?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    listas?: PedidoStatusOrderByRelationAggregateInput
    _relevance?: BoardOrderByRelevanceInput
  }

  export type BoardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BoardWhereInput | BoardWhereInput[]
    OR?: BoardWhereInput[]
    NOT?: BoardWhereInput | BoardWhereInput[]
    empresaId?: StringFilter<"Board"> | string
    titulo?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    listas?: PedidoStatusListRelationFilter
  }, "id">

  export type BoardOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    titulo?: SortOrder
    createdAt?: SortOrder
    _count?: BoardCountOrderByAggregateInput
    _max?: BoardMaxOrderByAggregateInput
    _min?: BoardMinOrderByAggregateInput
  }

  export type BoardScalarWhereWithAggregatesInput = {
    AND?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[]
    OR?: BoardScalarWhereWithAggregatesInput[]
    NOT?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Board"> | string
    empresaId?: StringWithAggregatesFilter<"Board"> | string
    titulo?: StringWithAggregatesFilter<"Board"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Board"> | Date | string
  }

  export type PedidoStatusWhereInput = {
    AND?: PedidoStatusWhereInput | PedidoStatusWhereInput[]
    OR?: PedidoStatusWhereInput[]
    NOT?: PedidoStatusWhereInput | PedidoStatusWhereInput[]
    id?: StringFilter<"PedidoStatus"> | string
    boardId?: StringFilter<"PedidoStatus"> | string
    titulo?: StringFilter<"PedidoStatus"> | string
    ordem?: IntFilter<"PedidoStatus"> | number
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    pedidos?: PedidoListRelationFilter
    logsOrigem?: LogMovimentacaoListRelationFilter
    logsDestino?: LogMovimentacaoListRelationFilter
  }

  export type PedidoStatusOrderByWithRelationInput = {
    id?: SortOrder
    boardId?: SortOrder
    titulo?: SortOrder
    ordem?: SortOrder
    board?: BoardOrderByWithRelationInput
    pedidos?: PedidoOrderByRelationAggregateInput
    logsOrigem?: LogMovimentacaoOrderByRelationAggregateInput
    logsDestino?: LogMovimentacaoOrderByRelationAggregateInput
    _relevance?: PedidoStatusOrderByRelevanceInput
  }

  export type PedidoStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PedidoStatusWhereInput | PedidoStatusWhereInput[]
    OR?: PedidoStatusWhereInput[]
    NOT?: PedidoStatusWhereInput | PedidoStatusWhereInput[]
    boardId?: StringFilter<"PedidoStatus"> | string
    titulo?: StringFilter<"PedidoStatus"> | string
    ordem?: IntFilter<"PedidoStatus"> | number
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    pedidos?: PedidoListRelationFilter
    logsOrigem?: LogMovimentacaoListRelationFilter
    logsDestino?: LogMovimentacaoListRelationFilter
  }, "id">

  export type PedidoStatusOrderByWithAggregationInput = {
    id?: SortOrder
    boardId?: SortOrder
    titulo?: SortOrder
    ordem?: SortOrder
    _count?: PedidoStatusCountOrderByAggregateInput
    _avg?: PedidoStatusAvgOrderByAggregateInput
    _max?: PedidoStatusMaxOrderByAggregateInput
    _min?: PedidoStatusMinOrderByAggregateInput
    _sum?: PedidoStatusSumOrderByAggregateInput
  }

  export type PedidoStatusScalarWhereWithAggregatesInput = {
    AND?: PedidoStatusScalarWhereWithAggregatesInput | PedidoStatusScalarWhereWithAggregatesInput[]
    OR?: PedidoStatusScalarWhereWithAggregatesInput[]
    NOT?: PedidoStatusScalarWhereWithAggregatesInput | PedidoStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PedidoStatus"> | string
    boardId?: StringWithAggregatesFilter<"PedidoStatus"> | string
    titulo?: StringWithAggregatesFilter<"PedidoStatus"> | string
    ordem?: IntWithAggregatesFilter<"PedidoStatus"> | number
  }

  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    id?: StringFilter<"Pedido"> | string
    statusId?: StringFilter<"Pedido"> | string
    empresaId?: StringFilter<"Pedido"> | string
    codigo?: StringFilter<"Pedido"> | string
    fonteId?: StringFilter<"Pedido"> | string
    pagamentoId?: StringFilter<"Pedido"> | string
    enderecoId?: StringNullableFilter<"Pedido"> | string | null
    desconto?: FloatFilter<"Pedido"> | number
    taxaEntrega?: FloatFilter<"Pedido"> | number
    valorTotal?: FloatFilter<"Pedido"> | number
    observacao?: StringNullableFilter<"Pedido"> | string | null
    criadoEm?: DateTimeFilter<"Pedido"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"Pedido"> | Date | string | null
    status?: XOR<PedidoStatusScalarRelationFilter, PedidoStatusWhereInput>
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    itens?: PedidoItemListRelationFilter
    pagamento?: XOR<FormaPagamentoScalarRelationFilter, FormaPagamentoWhereInput>
    endereco?: XOR<EnderecoNullableScalarRelationFilter, EnderecoWhereInput> | null
    fonte?: XOR<FontePedidoScalarRelationFilter, FontePedidoWhereInput>
    logs?: LogMovimentacaoListRelationFilter
  }

  export type PedidoOrderByWithRelationInput = {
    id?: SortOrder
    statusId?: SortOrder
    empresaId?: SortOrder
    codigo?: SortOrder
    fonteId?: SortOrder
    pagamentoId?: SortOrder
    enderecoId?: SortOrderInput | SortOrder
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
    observacao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrderInput | SortOrder
    status?: PedidoStatusOrderByWithRelationInput
    empresa?: EmpresaOrderByWithRelationInput
    itens?: PedidoItemOrderByRelationAggregateInput
    pagamento?: FormaPagamentoOrderByWithRelationInput
    endereco?: EnderecoOrderByWithRelationInput
    fonte?: FontePedidoOrderByWithRelationInput
    logs?: LogMovimentacaoOrderByRelationAggregateInput
    _relevance?: PedidoOrderByRelevanceInput
  }

  export type PedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codigo?: string
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    statusId?: StringFilter<"Pedido"> | string
    empresaId?: StringFilter<"Pedido"> | string
    fonteId?: StringFilter<"Pedido"> | string
    pagamentoId?: StringFilter<"Pedido"> | string
    enderecoId?: StringNullableFilter<"Pedido"> | string | null
    desconto?: FloatFilter<"Pedido"> | number
    taxaEntrega?: FloatFilter<"Pedido"> | number
    valorTotal?: FloatFilter<"Pedido"> | number
    observacao?: StringNullableFilter<"Pedido"> | string | null
    criadoEm?: DateTimeFilter<"Pedido"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"Pedido"> | Date | string | null
    status?: XOR<PedidoStatusScalarRelationFilter, PedidoStatusWhereInput>
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    itens?: PedidoItemListRelationFilter
    pagamento?: XOR<FormaPagamentoScalarRelationFilter, FormaPagamentoWhereInput>
    endereco?: XOR<EnderecoNullableScalarRelationFilter, EnderecoWhereInput> | null
    fonte?: XOR<FontePedidoScalarRelationFilter, FontePedidoWhereInput>
    logs?: LogMovimentacaoListRelationFilter
  }, "id" | "codigo">

  export type PedidoOrderByWithAggregationInput = {
    id?: SortOrder
    statusId?: SortOrder
    empresaId?: SortOrder
    codigo?: SortOrder
    fonteId?: SortOrder
    pagamentoId?: SortOrder
    enderecoId?: SortOrderInput | SortOrder
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
    observacao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrderInput | SortOrder
    _count?: PedidoCountOrderByAggregateInput
    _avg?: PedidoAvgOrderByAggregateInput
    _max?: PedidoMaxOrderByAggregateInput
    _min?: PedidoMinOrderByAggregateInput
    _sum?: PedidoSumOrderByAggregateInput
  }

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    OR?: PedidoScalarWhereWithAggregatesInput[]
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pedido"> | string
    statusId?: StringWithAggregatesFilter<"Pedido"> | string
    empresaId?: StringWithAggregatesFilter<"Pedido"> | string
    codigo?: StringWithAggregatesFilter<"Pedido"> | string
    fonteId?: StringWithAggregatesFilter<"Pedido"> | string
    pagamentoId?: StringWithAggregatesFilter<"Pedido"> | string
    enderecoId?: StringNullableWithAggregatesFilter<"Pedido"> | string | null
    desconto?: FloatWithAggregatesFilter<"Pedido"> | number
    taxaEntrega?: FloatWithAggregatesFilter<"Pedido"> | number
    valorTotal?: FloatWithAggregatesFilter<"Pedido"> | number
    observacao?: StringNullableWithAggregatesFilter<"Pedido"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    concluidoEm?: DateTimeNullableWithAggregatesFilter<"Pedido"> | Date | string | null
  }

  export type PedidoItemWhereInput = {
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    id?: StringFilter<"PedidoItem"> | string
    pedidoId?: StringFilter<"PedidoItem"> | string
    produtoId?: StringFilter<"PedidoItem"> | string
    quantidade?: IntFilter<"PedidoItem"> | number
    precoUnitario?: FloatFilter<"PedidoItem"> | number
    observacao?: StringNullableFilter<"PedidoItem"> | string | null
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }

  export type PedidoItemOrderByWithRelationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    precoUnitario?: SortOrder
    observacao?: SortOrderInput | SortOrder
    pedido?: PedidoOrderByWithRelationInput
    produto?: ProdutoOrderByWithRelationInput
    _relevance?: PedidoItemOrderByRelevanceInput
  }

  export type PedidoItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    pedidoId?: StringFilter<"PedidoItem"> | string
    produtoId?: StringFilter<"PedidoItem"> | string
    quantidade?: IntFilter<"PedidoItem"> | number
    precoUnitario?: FloatFilter<"PedidoItem"> | number
    observacao?: StringNullableFilter<"PedidoItem"> | string | null
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }, "id">

  export type PedidoItemOrderByWithAggregationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    precoUnitario?: SortOrder
    observacao?: SortOrderInput | SortOrder
    _count?: PedidoItemCountOrderByAggregateInput
    _avg?: PedidoItemAvgOrderByAggregateInput
    _max?: PedidoItemMaxOrderByAggregateInput
    _min?: PedidoItemMinOrderByAggregateInput
    _sum?: PedidoItemSumOrderByAggregateInput
  }

  export type PedidoItemScalarWhereWithAggregatesInput = {
    AND?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    OR?: PedidoItemScalarWhereWithAggregatesInput[]
    NOT?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PedidoItem"> | string
    pedidoId?: StringWithAggregatesFilter<"PedidoItem"> | string
    produtoId?: StringWithAggregatesFilter<"PedidoItem"> | string
    quantidade?: IntWithAggregatesFilter<"PedidoItem"> | number
    precoUnitario?: FloatWithAggregatesFilter<"PedidoItem"> | number
    observacao?: StringNullableWithAggregatesFilter<"PedidoItem"> | string | null
  }

  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    id?: StringFilter<"Produto"> | string
    empresaId?: StringFilter<"Produto"> | string
    nome?: StringFilter<"Produto"> | string
    descricao?: StringNullableFilter<"Produto"> | string | null
    precoBase?: FloatFilter<"Produto"> | number
    ativo?: BoolFilter<"Produto"> | boolean
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    itensPedido?: PedidoItemListRelationFilter
  }

  export type ProdutoOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    precoBase?: SortOrder
    ativo?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    itensPedido?: PedidoItemOrderByRelationAggregateInput
    _relevance?: ProdutoOrderByRelevanceInput
  }

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    empresaId?: StringFilter<"Produto"> | string
    nome?: StringFilter<"Produto"> | string
    descricao?: StringNullableFilter<"Produto"> | string | null
    precoBase?: FloatFilter<"Produto"> | number
    ativo?: BoolFilter<"Produto"> | boolean
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    itensPedido?: PedidoItemListRelationFilter
  }, "id">

  export type ProdutoOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    precoBase?: SortOrder
    ativo?: SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _avg?: ProdutoAvgOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
    _sum?: ProdutoSumOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    OR?: ProdutoScalarWhereWithAggregatesInput[]
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Produto"> | string
    empresaId?: StringWithAggregatesFilter<"Produto"> | string
    nome?: StringWithAggregatesFilter<"Produto"> | string
    descricao?: StringNullableWithAggregatesFilter<"Produto"> | string | null
    precoBase?: FloatWithAggregatesFilter<"Produto"> | number
    ativo?: BoolWithAggregatesFilter<"Produto"> | boolean
  }

  export type FormaPagamentoWhereInput = {
    AND?: FormaPagamentoWhereInput | FormaPagamentoWhereInput[]
    OR?: FormaPagamentoWhereInput[]
    NOT?: FormaPagamentoWhereInput | FormaPagamentoWhereInput[]
    id?: StringFilter<"FormaPagamento"> | string
    nome?: StringFilter<"FormaPagamento"> | string
    pedidos?: PedidoListRelationFilter
  }

  export type FormaPagamentoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    pedidos?: PedidoOrderByRelationAggregateInput
    _relevance?: FormaPagamentoOrderByRelevanceInput
  }

  export type FormaPagamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FormaPagamentoWhereInput | FormaPagamentoWhereInput[]
    OR?: FormaPagamentoWhereInput[]
    NOT?: FormaPagamentoWhereInput | FormaPagamentoWhereInput[]
    nome?: StringFilter<"FormaPagamento"> | string
    pedidos?: PedidoListRelationFilter
  }, "id">

  export type FormaPagamentoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    _count?: FormaPagamentoCountOrderByAggregateInput
    _max?: FormaPagamentoMaxOrderByAggregateInput
    _min?: FormaPagamentoMinOrderByAggregateInput
  }

  export type FormaPagamentoScalarWhereWithAggregatesInput = {
    AND?: FormaPagamentoScalarWhereWithAggregatesInput | FormaPagamentoScalarWhereWithAggregatesInput[]
    OR?: FormaPagamentoScalarWhereWithAggregatesInput[]
    NOT?: FormaPagamentoScalarWhereWithAggregatesInput | FormaPagamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FormaPagamento"> | string
    nome?: StringWithAggregatesFilter<"FormaPagamento"> | string
  }

  export type FontePedidoWhereInput = {
    AND?: FontePedidoWhereInput | FontePedidoWhereInput[]
    OR?: FontePedidoWhereInput[]
    NOT?: FontePedidoWhereInput | FontePedidoWhereInput[]
    id?: StringFilter<"FontePedido"> | string
    nome?: StringFilter<"FontePedido"> | string
    tipoIntegracao?: StringNullableFilter<"FontePedido"> | string | null
    pedidos?: PedidoListRelationFilter
  }

  export type FontePedidoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    tipoIntegracao?: SortOrderInput | SortOrder
    pedidos?: PedidoOrderByRelationAggregateInput
    _relevance?: FontePedidoOrderByRelevanceInput
  }

  export type FontePedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FontePedidoWhereInput | FontePedidoWhereInput[]
    OR?: FontePedidoWhereInput[]
    NOT?: FontePedidoWhereInput | FontePedidoWhereInput[]
    nome?: StringFilter<"FontePedido"> | string
    tipoIntegracao?: StringNullableFilter<"FontePedido"> | string | null
    pedidos?: PedidoListRelationFilter
  }, "id">

  export type FontePedidoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    tipoIntegracao?: SortOrderInput | SortOrder
    _count?: FontePedidoCountOrderByAggregateInput
    _max?: FontePedidoMaxOrderByAggregateInput
    _min?: FontePedidoMinOrderByAggregateInput
  }

  export type FontePedidoScalarWhereWithAggregatesInput = {
    AND?: FontePedidoScalarWhereWithAggregatesInput | FontePedidoScalarWhereWithAggregatesInput[]
    OR?: FontePedidoScalarWhereWithAggregatesInput[]
    NOT?: FontePedidoScalarWhereWithAggregatesInput | FontePedidoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FontePedido"> | string
    nome?: StringWithAggregatesFilter<"FontePedido"> | string
    tipoIntegracao?: StringNullableWithAggregatesFilter<"FontePedido"> | string | null
  }

  export type EnderecoWhereInput = {
    AND?: EnderecoWhereInput | EnderecoWhereInput[]
    OR?: EnderecoWhereInput[]
    NOT?: EnderecoWhereInput | EnderecoWhereInput[]
    id?: StringFilter<"Endereco"> | string
    rua?: StringFilter<"Endereco"> | string
    numero?: StringFilter<"Endereco"> | string
    complemento?: StringNullableFilter<"Endereco"> | string | null
    bairro?: StringFilter<"Endereco"> | string
    cidade?: StringFilter<"Endereco"> | string
    uf?: StringFilter<"Endereco"> | string
    cep?: StringNullableFilter<"Endereco"> | string | null
    referencia?: StringNullableFilter<"Endereco"> | string | null
    pedidos?: PedidoListRelationFilter
  }

  export type EnderecoOrderByWithRelationInput = {
    id?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    complemento?: SortOrderInput | SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    cep?: SortOrderInput | SortOrder
    referencia?: SortOrderInput | SortOrder
    pedidos?: PedidoOrderByRelationAggregateInput
    _relevance?: EnderecoOrderByRelevanceInput
  }

  export type EnderecoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnderecoWhereInput | EnderecoWhereInput[]
    OR?: EnderecoWhereInput[]
    NOT?: EnderecoWhereInput | EnderecoWhereInput[]
    rua?: StringFilter<"Endereco"> | string
    numero?: StringFilter<"Endereco"> | string
    complemento?: StringNullableFilter<"Endereco"> | string | null
    bairro?: StringFilter<"Endereco"> | string
    cidade?: StringFilter<"Endereco"> | string
    uf?: StringFilter<"Endereco"> | string
    cep?: StringNullableFilter<"Endereco"> | string | null
    referencia?: StringNullableFilter<"Endereco"> | string | null
    pedidos?: PedidoListRelationFilter
  }, "id">

  export type EnderecoOrderByWithAggregationInput = {
    id?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    complemento?: SortOrderInput | SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    cep?: SortOrderInput | SortOrder
    referencia?: SortOrderInput | SortOrder
    _count?: EnderecoCountOrderByAggregateInput
    _max?: EnderecoMaxOrderByAggregateInput
    _min?: EnderecoMinOrderByAggregateInput
  }

  export type EnderecoScalarWhereWithAggregatesInput = {
    AND?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[]
    OR?: EnderecoScalarWhereWithAggregatesInput[]
    NOT?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Endereco"> | string
    rua?: StringWithAggregatesFilter<"Endereco"> | string
    numero?: StringWithAggregatesFilter<"Endereco"> | string
    complemento?: StringNullableWithAggregatesFilter<"Endereco"> | string | null
    bairro?: StringWithAggregatesFilter<"Endereco"> | string
    cidade?: StringWithAggregatesFilter<"Endereco"> | string
    uf?: StringWithAggregatesFilter<"Endereco"> | string
    cep?: StringNullableWithAggregatesFilter<"Endereco"> | string | null
    referencia?: StringNullableWithAggregatesFilter<"Endereco"> | string | null
  }

  export type LogMovimentacaoWhereInput = {
    AND?: LogMovimentacaoWhereInput | LogMovimentacaoWhereInput[]
    OR?: LogMovimentacaoWhereInput[]
    NOT?: LogMovimentacaoWhereInput | LogMovimentacaoWhereInput[]
    id?: StringFilter<"LogMovimentacao"> | string
    pedidoId?: StringFilter<"LogMovimentacao"> | string
    deStatusId?: StringNullableFilter<"LogMovimentacao"> | string | null
    paraStatusId?: StringFilter<"LogMovimentacao"> | string
    dataMovimentacao?: DateTimeFilter<"LogMovimentacao"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
    deStatus?: XOR<PedidoStatusNullableScalarRelationFilter, PedidoStatusWhereInput> | null
    paraStatus?: XOR<PedidoStatusScalarRelationFilter, PedidoStatusWhereInput>
  }

  export type LogMovimentacaoOrderByWithRelationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    deStatusId?: SortOrderInput | SortOrder
    paraStatusId?: SortOrder
    dataMovimentacao?: SortOrder
    pedido?: PedidoOrderByWithRelationInput
    deStatus?: PedidoStatusOrderByWithRelationInput
    paraStatus?: PedidoStatusOrderByWithRelationInput
    _relevance?: LogMovimentacaoOrderByRelevanceInput
  }

  export type LogMovimentacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogMovimentacaoWhereInput | LogMovimentacaoWhereInput[]
    OR?: LogMovimentacaoWhereInput[]
    NOT?: LogMovimentacaoWhereInput | LogMovimentacaoWhereInput[]
    pedidoId?: StringFilter<"LogMovimentacao"> | string
    deStatusId?: StringNullableFilter<"LogMovimentacao"> | string | null
    paraStatusId?: StringFilter<"LogMovimentacao"> | string
    dataMovimentacao?: DateTimeFilter<"LogMovimentacao"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
    deStatus?: XOR<PedidoStatusNullableScalarRelationFilter, PedidoStatusWhereInput> | null
    paraStatus?: XOR<PedidoStatusScalarRelationFilter, PedidoStatusWhereInput>
  }, "id">

  export type LogMovimentacaoOrderByWithAggregationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    deStatusId?: SortOrderInput | SortOrder
    paraStatusId?: SortOrder
    dataMovimentacao?: SortOrder
    _count?: LogMovimentacaoCountOrderByAggregateInput
    _max?: LogMovimentacaoMaxOrderByAggregateInput
    _min?: LogMovimentacaoMinOrderByAggregateInput
  }

  export type LogMovimentacaoScalarWhereWithAggregatesInput = {
    AND?: LogMovimentacaoScalarWhereWithAggregatesInput | LogMovimentacaoScalarWhereWithAggregatesInput[]
    OR?: LogMovimentacaoScalarWhereWithAggregatesInput[]
    NOT?: LogMovimentacaoScalarWhereWithAggregatesInput | LogMovimentacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LogMovimentacao"> | string
    pedidoId?: StringWithAggregatesFilter<"LogMovimentacao"> | string
    deStatusId?: StringNullableWithAggregatesFilter<"LogMovimentacao"> | string | null
    paraStatusId?: StringWithAggregatesFilter<"LogMovimentacao"> | string
    dataMovimentacao?: DateTimeWithAggregatesFilter<"LogMovimentacao"> | Date | string
  }

  export type EmpresaCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaCreateManyInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
  }

  export type EmpresaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
    empresa: EmpresaCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    empresa?: EmpresaUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UsuarioCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type PlanoCreateInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    empresas?: EmpresaCreateNestedManyWithoutPlanoInput
    assinaturas?: AssinaturaCreateNestedManyWithoutPlanoInput
  }

  export type PlanoUncheckedCreateInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    empresas?: EmpresaUncheckedCreateNestedManyWithoutPlanoInput
    assinaturas?: AssinaturaUncheckedCreateNestedManyWithoutPlanoInput
  }

  export type PlanoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresas?: EmpresaUpdateManyWithoutPlanoNestedInput
    assinaturas?: AssinaturaUpdateManyWithoutPlanoNestedInput
  }

  export type PlanoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresas?: EmpresaUncheckedUpdateManyWithoutPlanoNestedInput
    assinaturas?: AssinaturaUncheckedUpdateManyWithoutPlanoNestedInput
  }

  export type PlanoCreateManyInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
  }

  export type PlanoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlanoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AssinaturaCreateInput = {
    id?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    empresa: EmpresaCreateNestedOneWithoutAssinaturaInput
    plano: PlanoCreateNestedOneWithoutAssinaturasInput
  }

  export type AssinaturaUncheckedCreateInput = {
    id?: string
    empresaId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    planoId: string
  }

  export type AssinaturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    empresa?: EmpresaUpdateOneRequiredWithoutAssinaturaNestedInput
    plano?: PlanoUpdateOneRequiredWithoutAssinaturasNestedInput
  }

  export type AssinaturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    planoId?: StringFieldUpdateOperationsInput | string
  }

  export type AssinaturaCreateManyInput = {
    id?: string
    empresaId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    planoId: string
  }

  export type AssinaturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssinaturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    planoId?: StringFieldUpdateOperationsInput | string
  }

  export type BoardCreateInput = {
    id?: string
    titulo: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutBoardsInput
    listas?: PedidoStatusCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateInput = {
    id?: string
    empresaId: string
    titulo: string
    createdAt?: Date | string
    listas?: PedidoStatusUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutBoardsNestedInput
    listas?: PedidoStatusUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listas?: PedidoStatusUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type BoardCreateManyInput = {
    id?: string
    empresaId: string
    titulo: string
    createdAt?: Date | string
  }

  export type BoardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoStatusCreateInput = {
    id?: string
    titulo: string
    ordem: number
    board: BoardCreateNestedOneWithoutListasInput
    pedidos?: PedidoCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusUncheckedCreateInput = {
    id?: string
    boardId: string
    titulo: string
    ordem: number
    pedidos?: PedidoUncheckedCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoUncheckedCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoUncheckedCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    board?: BoardUpdateOneRequiredWithoutListasNestedInput
    pedidos?: PedidoUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoUncheckedUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUncheckedUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUncheckedUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusCreateManyInput = {
    id?: string
    boardId: string
    titulo: string
    ordem: number
  }

  export type PedidoStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoCreateInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoCreateManyInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type PedidoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PedidoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PedidoItemCreateInput = {
    id?: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
    pedido: PedidoCreateNestedOneWithoutItensInput
    produto: ProdutoCreateNestedOneWithoutItensPedidoInput
  }

  export type PedidoItemUncheckedCreateInput = {
    id?: string
    pedidoId: string
    produtoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type PedidoItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    pedido?: PedidoUpdateOneRequiredWithoutItensNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutItensPedidoNestedInput
  }

  export type PedidoItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    produtoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PedidoItemCreateManyInput = {
    id?: string
    pedidoId: string
    produtoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type PedidoItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PedidoItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    produtoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
    itensPedido?: PedidoItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
    itensPedido?: PedidoItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
    itensPedido?: PedidoItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    itensPedido?: PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
  }

  export type ProdutoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProdutoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FormaPagamentoCreateInput = {
    id?: string
    nome: string
    pedidos?: PedidoCreateNestedManyWithoutPagamentoInput
  }

  export type FormaPagamentoUncheckedCreateInput = {
    id?: string
    nome: string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutPagamentoInput
  }

  export type FormaPagamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUpdateManyWithoutPagamentoNestedInput
  }

  export type FormaPagamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUncheckedUpdateManyWithoutPagamentoNestedInput
  }

  export type FormaPagamentoCreateManyInput = {
    id?: string
    nome: string
  }

  export type FormaPagamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type FormaPagamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type FontePedidoCreateInput = {
    id?: string
    nome: string
    tipoIntegracao?: string | null
    pedidos?: PedidoCreateNestedManyWithoutFonteInput
  }

  export type FontePedidoUncheckedCreateInput = {
    id?: string
    nome: string
    tipoIntegracao?: string | null
    pedidos?: PedidoUncheckedCreateNestedManyWithoutFonteInput
  }

  export type FontePedidoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
    pedidos?: PedidoUpdateManyWithoutFonteNestedInput
  }

  export type FontePedidoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
    pedidos?: PedidoUncheckedUpdateManyWithoutFonteNestedInput
  }

  export type FontePedidoCreateManyInput = {
    id?: string
    nome: string
    tipoIntegracao?: string | null
  }

  export type FontePedidoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontePedidoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoCreateInput = {
    id?: string
    rua: string
    numero: string
    complemento?: string | null
    bairro: string
    cidade: string
    uf: string
    cep?: string | null
    referencia?: string | null
    pedidos?: PedidoCreateNestedManyWithoutEnderecoInput
  }

  export type EnderecoUncheckedCreateInput = {
    id?: string
    rua: string
    numero: string
    complemento?: string | null
    bairro: string
    cidade: string
    uf: string
    cep?: string | null
    referencia?: string | null
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEnderecoInput
  }

  export type EnderecoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
    pedidos?: PedidoUpdateManyWithoutEnderecoNestedInput
  }

  export type EnderecoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
    pedidos?: PedidoUncheckedUpdateManyWithoutEnderecoNestedInput
  }

  export type EnderecoCreateManyInput = {
    id?: string
    rua: string
    numero: string
    complemento?: string | null
    bairro: string
    cidade: string
    uf: string
    cep?: string | null
    referencia?: string | null
  }

  export type EnderecoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogMovimentacaoCreateInput = {
    id?: string
    dataMovimentacao?: Date | string
    pedido: PedidoCreateNestedOneWithoutLogsInput
    deStatus?: PedidoStatusCreateNestedOneWithoutLogsOrigemInput
    paraStatus: PedidoStatusCreateNestedOneWithoutLogsDestinoInput
  }

  export type LogMovimentacaoUncheckedCreateInput = {
    id?: string
    pedidoId: string
    deStatusId?: string | null
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutLogsNestedInput
    deStatus?: PedidoStatusUpdateOneWithoutLogsOrigemNestedInput
    paraStatus?: PedidoStatusUpdateOneRequiredWithoutLogsDestinoNestedInput
  }

  export type LogMovimentacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoCreateManyInput = {
    id?: string
    pedidoId: string
    deStatusId?: string | null
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlanoScalarRelationFilter = {
    is?: PlanoWhereInput
    isNot?: PlanoWhereInput
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type BoardListRelationFilter = {
    every?: BoardWhereInput
    some?: BoardWhereInput
    none?: BoardWhereInput
  }

  export type PedidoListRelationFilter = {
    every?: PedidoWhereInput
    some?: PedidoWhereInput
    none?: PedidoWhereInput
  }

  export type ProdutoListRelationFilter = {
    every?: ProdutoWhereInput
    some?: ProdutoWhereInput
    none?: ProdutoWhereInput
  }

  export type AssinaturaNullableScalarRelationFilter = {
    is?: AssinaturaWhereInput | null
    isNot?: AssinaturaWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BoardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaOrderByRelevanceInput = {
    fields: EmpresaOrderByRelevanceFieldEnum | EmpresaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    planoAtualId?: SortOrder
    criadaEm?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    planoAtualId?: SortOrder
    criadaEm?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    planoAtualId?: SortOrder
    criadaEm?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EmpresaScalarRelationFilter = {
    is?: EmpresaWhereInput
    isNot?: EmpresaWhereInput
  }

  export type UsuarioOrderByRelevanceInput = {
    fields: UsuarioOrderByRelevanceFieldEnum | UsuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    role?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    role?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    role?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EmpresaListRelationFilter = {
    every?: EmpresaWhereInput
    some?: EmpresaWhereInput
    none?: EmpresaWhereInput
  }

  export type AssinaturaListRelationFilter = {
    every?: AssinaturaWhereInput
    some?: AssinaturaWhereInput
    none?: AssinaturaWhereInput
  }

  export type EmpresaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssinaturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanoOrderByRelevanceInput = {
    fields: PlanoOrderByRelevanceFieldEnum | PlanoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlanoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
    ativo?: SortOrder
  }

  export type PlanoAvgOrderByAggregateInput = {
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
  }

  export type PlanoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
    ativo?: SortOrder
  }

  export type PlanoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
    ativo?: SortOrder
  }

  export type PlanoSumOrderByAggregateInput = {
    limitePedidosMes?: SortOrder
    precoMensal?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AssinaturaOrderByRelevanceInput = {
    fields: AssinaturaOrderByRelevanceFieldEnum | AssinaturaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssinaturaCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    periodoFim?: SortOrder
    planoId?: SortOrder
  }

  export type AssinaturaMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    periodoFim?: SortOrder
    planoId?: SortOrder
  }

  export type AssinaturaMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    periodoFim?: SortOrder
    planoId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PedidoStatusListRelationFilter = {
    every?: PedidoStatusWhereInput
    some?: PedidoStatusWhereInput
    none?: PedidoStatusWhereInput
  }

  export type PedidoStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BoardOrderByRelevanceInput = {
    fields: BoardOrderByRelevanceFieldEnum | BoardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BoardCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    titulo?: SortOrder
    createdAt?: SortOrder
  }

  export type BoardMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    titulo?: SortOrder
    createdAt?: SortOrder
  }

  export type BoardMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    titulo?: SortOrder
    createdAt?: SortOrder
  }

  export type BoardScalarRelationFilter = {
    is?: BoardWhereInput
    isNot?: BoardWhereInput
  }

  export type LogMovimentacaoListRelationFilter = {
    every?: LogMovimentacaoWhereInput
    some?: LogMovimentacaoWhereInput
    none?: LogMovimentacaoWhereInput
  }

  export type LogMovimentacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoStatusOrderByRelevanceInput = {
    fields: PedidoStatusOrderByRelevanceFieldEnum | PedidoStatusOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PedidoStatusCountOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    titulo?: SortOrder
    ordem?: SortOrder
  }

  export type PedidoStatusAvgOrderByAggregateInput = {
    ordem?: SortOrder
  }

  export type PedidoStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    titulo?: SortOrder
    ordem?: SortOrder
  }

  export type PedidoStatusMinOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    titulo?: SortOrder
    ordem?: SortOrder
  }

  export type PedidoStatusSumOrderByAggregateInput = {
    ordem?: SortOrder
  }

  export type PedidoStatusScalarRelationFilter = {
    is?: PedidoStatusWhereInput
    isNot?: PedidoStatusWhereInput
  }

  export type PedidoItemListRelationFilter = {
    every?: PedidoItemWhereInput
    some?: PedidoItemWhereInput
    none?: PedidoItemWhereInput
  }

  export type FormaPagamentoScalarRelationFilter = {
    is?: FormaPagamentoWhereInput
    isNot?: FormaPagamentoWhereInput
  }

  export type EnderecoNullableScalarRelationFilter = {
    is?: EnderecoWhereInput | null
    isNot?: EnderecoWhereInput | null
  }

  export type FontePedidoScalarRelationFilter = {
    is?: FontePedidoWhereInput
    isNot?: FontePedidoWhereInput
  }

  export type PedidoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoOrderByRelevanceInput = {
    fields: PedidoOrderByRelevanceFieldEnum | PedidoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PedidoCountOrderByAggregateInput = {
    id?: SortOrder
    statusId?: SortOrder
    empresaId?: SortOrder
    codigo?: SortOrder
    fonteId?: SortOrder
    pagamentoId?: SortOrder
    enderecoId?: SortOrder
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type PedidoAvgOrderByAggregateInput = {
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
  }

  export type PedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    statusId?: SortOrder
    empresaId?: SortOrder
    codigo?: SortOrder
    fonteId?: SortOrder
    pagamentoId?: SortOrder
    enderecoId?: SortOrder
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type PedidoMinOrderByAggregateInput = {
    id?: SortOrder
    statusId?: SortOrder
    empresaId?: SortOrder
    codigo?: SortOrder
    fonteId?: SortOrder
    pagamentoId?: SortOrder
    enderecoId?: SortOrder
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type PedidoSumOrderByAggregateInput = {
    desconto?: SortOrder
    taxaEntrega?: SortOrder
    valorTotal?: SortOrder
  }

  export type PedidoScalarRelationFilter = {
    is?: PedidoWhereInput
    isNot?: PedidoWhereInput
  }

  export type ProdutoScalarRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type PedidoItemOrderByRelevanceInput = {
    fields: PedidoItemOrderByRelevanceFieldEnum | PedidoItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PedidoItemCountOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    precoUnitario?: SortOrder
    observacao?: SortOrder
  }

  export type PedidoItemAvgOrderByAggregateInput = {
    quantidade?: SortOrder
    precoUnitario?: SortOrder
  }

  export type PedidoItemMaxOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    precoUnitario?: SortOrder
    observacao?: SortOrder
  }

  export type PedidoItemMinOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    precoUnitario?: SortOrder
    observacao?: SortOrder
  }

  export type PedidoItemSumOrderByAggregateInput = {
    quantidade?: SortOrder
    precoUnitario?: SortOrder
  }

  export type ProdutoOrderByRelevanceInput = {
    fields: ProdutoOrderByRelevanceFieldEnum | ProdutoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProdutoCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    precoBase?: SortOrder
    ativo?: SortOrder
  }

  export type ProdutoAvgOrderByAggregateInput = {
    precoBase?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    precoBase?: SortOrder
    ativo?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    precoBase?: SortOrder
    ativo?: SortOrder
  }

  export type ProdutoSumOrderByAggregateInput = {
    precoBase?: SortOrder
  }

  export type FormaPagamentoOrderByRelevanceInput = {
    fields: FormaPagamentoOrderByRelevanceFieldEnum | FormaPagamentoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormaPagamentoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type FormaPagamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type FormaPagamentoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type FontePedidoOrderByRelevanceInput = {
    fields: FontePedidoOrderByRelevanceFieldEnum | FontePedidoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FontePedidoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipoIntegracao?: SortOrder
  }

  export type FontePedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipoIntegracao?: SortOrder
  }

  export type FontePedidoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipoIntegracao?: SortOrder
  }

  export type EnderecoOrderByRelevanceInput = {
    fields: EnderecoOrderByRelevanceFieldEnum | EnderecoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EnderecoCountOrderByAggregateInput = {
    id?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    complemento?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    cep?: SortOrder
    referencia?: SortOrder
  }

  export type EnderecoMaxOrderByAggregateInput = {
    id?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    complemento?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    cep?: SortOrder
    referencia?: SortOrder
  }

  export type EnderecoMinOrderByAggregateInput = {
    id?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    complemento?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    cep?: SortOrder
    referencia?: SortOrder
  }

  export type PedidoStatusNullableScalarRelationFilter = {
    is?: PedidoStatusWhereInput | null
    isNot?: PedidoStatusWhereInput | null
  }

  export type LogMovimentacaoOrderByRelevanceInput = {
    fields: LogMovimentacaoOrderByRelevanceFieldEnum | LogMovimentacaoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LogMovimentacaoCountOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    deStatusId?: SortOrder
    paraStatusId?: SortOrder
    dataMovimentacao?: SortOrder
  }

  export type LogMovimentacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    deStatusId?: SortOrder
    paraStatusId?: SortOrder
    dataMovimentacao?: SortOrder
  }

  export type LogMovimentacaoMinOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    deStatusId?: SortOrder
    paraStatusId?: SortOrder
    dataMovimentacao?: SortOrder
  }

  export type PlanoCreateNestedOneWithoutEmpresasInput = {
    create?: XOR<PlanoCreateWithoutEmpresasInput, PlanoUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: PlanoCreateOrConnectWithoutEmpresasInput
    connect?: PlanoWhereUniqueInput
  }

  export type UsuarioCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type BoardCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput> | BoardCreateWithoutEmpresaInput[] | BoardUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutEmpresaInput | BoardCreateOrConnectWithoutEmpresaInput[]
    createMany?: BoardCreateManyEmpresaInputEnvelope
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
  }

  export type PedidoCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput> | PedidoCreateWithoutEmpresaInput[] | PedidoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEmpresaInput | PedidoCreateOrConnectWithoutEmpresaInput[]
    createMany?: PedidoCreateManyEmpresaInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type ProdutoCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput> | ProdutoCreateWithoutEmpresaInput[] | ProdutoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutEmpresaInput | ProdutoCreateOrConnectWithoutEmpresaInput[]
    createMany?: ProdutoCreateManyEmpresaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type AssinaturaCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: AssinaturaCreateOrConnectWithoutEmpresaInput
    connect?: AssinaturaWhereUniqueInput
  }

  export type UsuarioUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type BoardUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput> | BoardCreateWithoutEmpresaInput[] | BoardUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutEmpresaInput | BoardCreateOrConnectWithoutEmpresaInput[]
    createMany?: BoardCreateManyEmpresaInputEnvelope
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput> | PedidoCreateWithoutEmpresaInput[] | PedidoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEmpresaInput | PedidoCreateOrConnectWithoutEmpresaInput[]
    createMany?: PedidoCreateManyEmpresaInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type ProdutoUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput> | ProdutoCreateWithoutEmpresaInput[] | ProdutoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutEmpresaInput | ProdutoCreateOrConnectWithoutEmpresaInput[]
    createMany?: ProdutoCreateManyEmpresaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: AssinaturaCreateOrConnectWithoutEmpresaInput
    connect?: AssinaturaWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlanoUpdateOneRequiredWithoutEmpresasNestedInput = {
    create?: XOR<PlanoCreateWithoutEmpresasInput, PlanoUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: PlanoCreateOrConnectWithoutEmpresasInput
    upsert?: PlanoUpsertWithoutEmpresasInput
    connect?: PlanoWhereUniqueInput
    update?: XOR<XOR<PlanoUpdateToOneWithWhereWithoutEmpresasInput, PlanoUpdateWithoutEmpresasInput>, PlanoUncheckedUpdateWithoutEmpresasInput>
  }

  export type UsuarioUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutEmpresaInput | UsuarioUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutEmpresaInput | UsuarioUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutEmpresaInput | UsuarioUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type BoardUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput> | BoardCreateWithoutEmpresaInput[] | BoardUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutEmpresaInput | BoardCreateOrConnectWithoutEmpresaInput[]
    upsert?: BoardUpsertWithWhereUniqueWithoutEmpresaInput | BoardUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: BoardCreateManyEmpresaInputEnvelope
    set?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    disconnect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    delete?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    update?: BoardUpdateWithWhereUniqueWithoutEmpresaInput | BoardUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: BoardUpdateManyWithWhereWithoutEmpresaInput | BoardUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: BoardScalarWhereInput | BoardScalarWhereInput[]
  }

  export type PedidoUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput> | PedidoCreateWithoutEmpresaInput[] | PedidoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEmpresaInput | PedidoCreateOrConnectWithoutEmpresaInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutEmpresaInput | PedidoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: PedidoCreateManyEmpresaInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutEmpresaInput | PedidoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutEmpresaInput | PedidoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type ProdutoUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput> | ProdutoCreateWithoutEmpresaInput[] | ProdutoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutEmpresaInput | ProdutoCreateOrConnectWithoutEmpresaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutEmpresaInput | ProdutoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ProdutoCreateManyEmpresaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutEmpresaInput | ProdutoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutEmpresaInput | ProdutoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type AssinaturaUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: AssinaturaCreateOrConnectWithoutEmpresaInput
    upsert?: AssinaturaUpsertWithoutEmpresaInput
    disconnect?: AssinaturaWhereInput | boolean
    delete?: AssinaturaWhereInput | boolean
    connect?: AssinaturaWhereUniqueInput
    update?: XOR<XOR<AssinaturaUpdateToOneWithWhereWithoutEmpresaInput, AssinaturaUpdateWithoutEmpresaInput>, AssinaturaUncheckedUpdateWithoutEmpresaInput>
  }

  export type UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutEmpresaInput | UsuarioUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutEmpresaInput | UsuarioUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutEmpresaInput | UsuarioUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type BoardUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput> | BoardCreateWithoutEmpresaInput[] | BoardUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutEmpresaInput | BoardCreateOrConnectWithoutEmpresaInput[]
    upsert?: BoardUpsertWithWhereUniqueWithoutEmpresaInput | BoardUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: BoardCreateManyEmpresaInputEnvelope
    set?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    disconnect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    delete?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    update?: BoardUpdateWithWhereUniqueWithoutEmpresaInput | BoardUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: BoardUpdateManyWithWhereWithoutEmpresaInput | BoardUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: BoardScalarWhereInput | BoardScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput> | PedidoCreateWithoutEmpresaInput[] | PedidoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEmpresaInput | PedidoCreateOrConnectWithoutEmpresaInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutEmpresaInput | PedidoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: PedidoCreateManyEmpresaInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutEmpresaInput | PedidoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutEmpresaInput | PedidoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput> | ProdutoCreateWithoutEmpresaInput[] | ProdutoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutEmpresaInput | ProdutoCreateOrConnectWithoutEmpresaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutEmpresaInput | ProdutoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ProdutoCreateManyEmpresaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutEmpresaInput | ProdutoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutEmpresaInput | ProdutoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: AssinaturaCreateOrConnectWithoutEmpresaInput
    upsert?: AssinaturaUpsertWithoutEmpresaInput
    disconnect?: AssinaturaWhereInput | boolean
    delete?: AssinaturaWhereInput | boolean
    connect?: AssinaturaWhereUniqueInput
    update?: XOR<XOR<AssinaturaUpdateToOneWithWhereWithoutEmpresaInput, AssinaturaUpdateWithoutEmpresaInput>, AssinaturaUncheckedUpdateWithoutEmpresaInput>
  }

  export type EmpresaCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EmpresaUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    upsert?: EmpresaUpsertWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutUsuariosInput, EmpresaUpdateWithoutUsuariosInput>, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type EmpresaCreateNestedManyWithoutPlanoInput = {
    create?: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput> | EmpresaCreateWithoutPlanoInput[] | EmpresaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutPlanoInput | EmpresaCreateOrConnectWithoutPlanoInput[]
    createMany?: EmpresaCreateManyPlanoInputEnvelope
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type AssinaturaCreateNestedManyWithoutPlanoInput = {
    create?: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput> | AssinaturaCreateWithoutPlanoInput[] | AssinaturaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: AssinaturaCreateOrConnectWithoutPlanoInput | AssinaturaCreateOrConnectWithoutPlanoInput[]
    createMany?: AssinaturaCreateManyPlanoInputEnvelope
    connect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
  }

  export type EmpresaUncheckedCreateNestedManyWithoutPlanoInput = {
    create?: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput> | EmpresaCreateWithoutPlanoInput[] | EmpresaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutPlanoInput | EmpresaCreateOrConnectWithoutPlanoInput[]
    createMany?: EmpresaCreateManyPlanoInputEnvelope
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type AssinaturaUncheckedCreateNestedManyWithoutPlanoInput = {
    create?: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput> | AssinaturaCreateWithoutPlanoInput[] | AssinaturaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: AssinaturaCreateOrConnectWithoutPlanoInput | AssinaturaCreateOrConnectWithoutPlanoInput[]
    createMany?: AssinaturaCreateManyPlanoInputEnvelope
    connect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmpresaUpdateManyWithoutPlanoNestedInput = {
    create?: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput> | EmpresaCreateWithoutPlanoInput[] | EmpresaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutPlanoInput | EmpresaCreateOrConnectWithoutPlanoInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutPlanoInput | EmpresaUpsertWithWhereUniqueWithoutPlanoInput[]
    createMany?: EmpresaCreateManyPlanoInputEnvelope
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutPlanoInput | EmpresaUpdateWithWhereUniqueWithoutPlanoInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutPlanoInput | EmpresaUpdateManyWithWhereWithoutPlanoInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type AssinaturaUpdateManyWithoutPlanoNestedInput = {
    create?: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput> | AssinaturaCreateWithoutPlanoInput[] | AssinaturaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: AssinaturaCreateOrConnectWithoutPlanoInput | AssinaturaCreateOrConnectWithoutPlanoInput[]
    upsert?: AssinaturaUpsertWithWhereUniqueWithoutPlanoInput | AssinaturaUpsertWithWhereUniqueWithoutPlanoInput[]
    createMany?: AssinaturaCreateManyPlanoInputEnvelope
    set?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    disconnect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    delete?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    connect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    update?: AssinaturaUpdateWithWhereUniqueWithoutPlanoInput | AssinaturaUpdateWithWhereUniqueWithoutPlanoInput[]
    updateMany?: AssinaturaUpdateManyWithWhereWithoutPlanoInput | AssinaturaUpdateManyWithWhereWithoutPlanoInput[]
    deleteMany?: AssinaturaScalarWhereInput | AssinaturaScalarWhereInput[]
  }

  export type EmpresaUncheckedUpdateManyWithoutPlanoNestedInput = {
    create?: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput> | EmpresaCreateWithoutPlanoInput[] | EmpresaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutPlanoInput | EmpresaCreateOrConnectWithoutPlanoInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutPlanoInput | EmpresaUpsertWithWhereUniqueWithoutPlanoInput[]
    createMany?: EmpresaCreateManyPlanoInputEnvelope
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutPlanoInput | EmpresaUpdateWithWhereUniqueWithoutPlanoInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutPlanoInput | EmpresaUpdateManyWithWhereWithoutPlanoInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type AssinaturaUncheckedUpdateManyWithoutPlanoNestedInput = {
    create?: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput> | AssinaturaCreateWithoutPlanoInput[] | AssinaturaUncheckedCreateWithoutPlanoInput[]
    connectOrCreate?: AssinaturaCreateOrConnectWithoutPlanoInput | AssinaturaCreateOrConnectWithoutPlanoInput[]
    upsert?: AssinaturaUpsertWithWhereUniqueWithoutPlanoInput | AssinaturaUpsertWithWhereUniqueWithoutPlanoInput[]
    createMany?: AssinaturaCreateManyPlanoInputEnvelope
    set?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    disconnect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    delete?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    connect?: AssinaturaWhereUniqueInput | AssinaturaWhereUniqueInput[]
    update?: AssinaturaUpdateWithWhereUniqueWithoutPlanoInput | AssinaturaUpdateWithWhereUniqueWithoutPlanoInput[]
    updateMany?: AssinaturaUpdateManyWithWhereWithoutPlanoInput | AssinaturaUpdateManyWithWhereWithoutPlanoInput[]
    deleteMany?: AssinaturaScalarWhereInput | AssinaturaScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutAssinaturaInput = {
    create?: XOR<EmpresaCreateWithoutAssinaturaInput, EmpresaUncheckedCreateWithoutAssinaturaInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutAssinaturaInput
    connect?: EmpresaWhereUniqueInput
  }

  export type PlanoCreateNestedOneWithoutAssinaturasInput = {
    create?: XOR<PlanoCreateWithoutAssinaturasInput, PlanoUncheckedCreateWithoutAssinaturasInput>
    connectOrCreate?: PlanoCreateOrConnectWithoutAssinaturasInput
    connect?: PlanoWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmpresaUpdateOneRequiredWithoutAssinaturaNestedInput = {
    create?: XOR<EmpresaCreateWithoutAssinaturaInput, EmpresaUncheckedCreateWithoutAssinaturaInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutAssinaturaInput
    upsert?: EmpresaUpsertWithoutAssinaturaInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutAssinaturaInput, EmpresaUpdateWithoutAssinaturaInput>, EmpresaUncheckedUpdateWithoutAssinaturaInput>
  }

  export type PlanoUpdateOneRequiredWithoutAssinaturasNestedInput = {
    create?: XOR<PlanoCreateWithoutAssinaturasInput, PlanoUncheckedCreateWithoutAssinaturasInput>
    connectOrCreate?: PlanoCreateOrConnectWithoutAssinaturasInput
    upsert?: PlanoUpsertWithoutAssinaturasInput
    connect?: PlanoWhereUniqueInput
    update?: XOR<XOR<PlanoUpdateToOneWithWhereWithoutAssinaturasInput, PlanoUpdateWithoutAssinaturasInput>, PlanoUncheckedUpdateWithoutAssinaturasInput>
  }

  export type EmpresaCreateNestedOneWithoutBoardsInput = {
    create?: XOR<EmpresaCreateWithoutBoardsInput, EmpresaUncheckedCreateWithoutBoardsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutBoardsInput
    connect?: EmpresaWhereUniqueInput
  }

  export type PedidoStatusCreateNestedManyWithoutBoardInput = {
    create?: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput> | PedidoStatusCreateWithoutBoardInput[] | PedidoStatusUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutBoardInput | PedidoStatusCreateOrConnectWithoutBoardInput[]
    createMany?: PedidoStatusCreateManyBoardInputEnvelope
    connect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
  }

  export type PedidoStatusUncheckedCreateNestedManyWithoutBoardInput = {
    create?: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput> | PedidoStatusCreateWithoutBoardInput[] | PedidoStatusUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutBoardInput | PedidoStatusCreateOrConnectWithoutBoardInput[]
    createMany?: PedidoStatusCreateManyBoardInputEnvelope
    connect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
  }

  export type EmpresaUpdateOneRequiredWithoutBoardsNestedInput = {
    create?: XOR<EmpresaCreateWithoutBoardsInput, EmpresaUncheckedCreateWithoutBoardsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutBoardsInput
    upsert?: EmpresaUpsertWithoutBoardsInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutBoardsInput, EmpresaUpdateWithoutBoardsInput>, EmpresaUncheckedUpdateWithoutBoardsInput>
  }

  export type PedidoStatusUpdateManyWithoutBoardNestedInput = {
    create?: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput> | PedidoStatusCreateWithoutBoardInput[] | PedidoStatusUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutBoardInput | PedidoStatusCreateOrConnectWithoutBoardInput[]
    upsert?: PedidoStatusUpsertWithWhereUniqueWithoutBoardInput | PedidoStatusUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: PedidoStatusCreateManyBoardInputEnvelope
    set?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    disconnect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    delete?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    connect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    update?: PedidoStatusUpdateWithWhereUniqueWithoutBoardInput | PedidoStatusUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: PedidoStatusUpdateManyWithWhereWithoutBoardInput | PedidoStatusUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: PedidoStatusScalarWhereInput | PedidoStatusScalarWhereInput[]
  }

  export type PedidoStatusUncheckedUpdateManyWithoutBoardNestedInput = {
    create?: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput> | PedidoStatusCreateWithoutBoardInput[] | PedidoStatusUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutBoardInput | PedidoStatusCreateOrConnectWithoutBoardInput[]
    upsert?: PedidoStatusUpsertWithWhereUniqueWithoutBoardInput | PedidoStatusUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: PedidoStatusCreateManyBoardInputEnvelope
    set?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    disconnect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    delete?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    connect?: PedidoStatusWhereUniqueInput | PedidoStatusWhereUniqueInput[]
    update?: PedidoStatusUpdateWithWhereUniqueWithoutBoardInput | PedidoStatusUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: PedidoStatusUpdateManyWithWhereWithoutBoardInput | PedidoStatusUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: PedidoStatusScalarWhereInput | PedidoStatusScalarWhereInput[]
  }

  export type BoardCreateNestedOneWithoutListasInput = {
    create?: XOR<BoardCreateWithoutListasInput, BoardUncheckedCreateWithoutListasInput>
    connectOrCreate?: BoardCreateOrConnectWithoutListasInput
    connect?: BoardWhereUniqueInput
  }

  export type PedidoCreateNestedManyWithoutStatusInput = {
    create?: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput> | PedidoCreateWithoutStatusInput[] | PedidoUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutStatusInput | PedidoCreateOrConnectWithoutStatusInput[]
    createMany?: PedidoCreateManyStatusInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type LogMovimentacaoCreateNestedManyWithoutDeStatusInput = {
    create?: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput> | LogMovimentacaoCreateWithoutDeStatusInput[] | LogMovimentacaoUncheckedCreateWithoutDeStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutDeStatusInput | LogMovimentacaoCreateOrConnectWithoutDeStatusInput[]
    createMany?: LogMovimentacaoCreateManyDeStatusInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type LogMovimentacaoCreateNestedManyWithoutParaStatusInput = {
    create?: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput> | LogMovimentacaoCreateWithoutParaStatusInput[] | LogMovimentacaoUncheckedCreateWithoutParaStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutParaStatusInput | LogMovimentacaoCreateOrConnectWithoutParaStatusInput[]
    createMany?: LogMovimentacaoCreateManyParaStatusInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutStatusInput = {
    create?: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput> | PedidoCreateWithoutStatusInput[] | PedidoUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutStatusInput | PedidoCreateOrConnectWithoutStatusInput[]
    createMany?: PedidoCreateManyStatusInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type LogMovimentacaoUncheckedCreateNestedManyWithoutDeStatusInput = {
    create?: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput> | LogMovimentacaoCreateWithoutDeStatusInput[] | LogMovimentacaoUncheckedCreateWithoutDeStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutDeStatusInput | LogMovimentacaoCreateOrConnectWithoutDeStatusInput[]
    createMany?: LogMovimentacaoCreateManyDeStatusInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type LogMovimentacaoUncheckedCreateNestedManyWithoutParaStatusInput = {
    create?: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput> | LogMovimentacaoCreateWithoutParaStatusInput[] | LogMovimentacaoUncheckedCreateWithoutParaStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutParaStatusInput | LogMovimentacaoCreateOrConnectWithoutParaStatusInput[]
    createMany?: LogMovimentacaoCreateManyParaStatusInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type BoardUpdateOneRequiredWithoutListasNestedInput = {
    create?: XOR<BoardCreateWithoutListasInput, BoardUncheckedCreateWithoutListasInput>
    connectOrCreate?: BoardCreateOrConnectWithoutListasInput
    upsert?: BoardUpsertWithoutListasInput
    connect?: BoardWhereUniqueInput
    update?: XOR<XOR<BoardUpdateToOneWithWhereWithoutListasInput, BoardUpdateWithoutListasInput>, BoardUncheckedUpdateWithoutListasInput>
  }

  export type PedidoUpdateManyWithoutStatusNestedInput = {
    create?: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput> | PedidoCreateWithoutStatusInput[] | PedidoUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutStatusInput | PedidoCreateOrConnectWithoutStatusInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutStatusInput | PedidoUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: PedidoCreateManyStatusInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutStatusInput | PedidoUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutStatusInput | PedidoUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type LogMovimentacaoUpdateManyWithoutDeStatusNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput> | LogMovimentacaoCreateWithoutDeStatusInput[] | LogMovimentacaoUncheckedCreateWithoutDeStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutDeStatusInput | LogMovimentacaoCreateOrConnectWithoutDeStatusInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutDeStatusInput | LogMovimentacaoUpsertWithWhereUniqueWithoutDeStatusInput[]
    createMany?: LogMovimentacaoCreateManyDeStatusInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutDeStatusInput | LogMovimentacaoUpdateWithWhereUniqueWithoutDeStatusInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutDeStatusInput | LogMovimentacaoUpdateManyWithWhereWithoutDeStatusInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type LogMovimentacaoUpdateManyWithoutParaStatusNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput> | LogMovimentacaoCreateWithoutParaStatusInput[] | LogMovimentacaoUncheckedCreateWithoutParaStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutParaStatusInput | LogMovimentacaoCreateOrConnectWithoutParaStatusInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutParaStatusInput | LogMovimentacaoUpsertWithWhereUniqueWithoutParaStatusInput[]
    createMany?: LogMovimentacaoCreateManyParaStatusInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutParaStatusInput | LogMovimentacaoUpdateWithWhereUniqueWithoutParaStatusInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutParaStatusInput | LogMovimentacaoUpdateManyWithWhereWithoutParaStatusInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput> | PedidoCreateWithoutStatusInput[] | PedidoUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutStatusInput | PedidoCreateOrConnectWithoutStatusInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutStatusInput | PedidoUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: PedidoCreateManyStatusInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutStatusInput | PedidoUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutStatusInput | PedidoUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutDeStatusNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput> | LogMovimentacaoCreateWithoutDeStatusInput[] | LogMovimentacaoUncheckedCreateWithoutDeStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutDeStatusInput | LogMovimentacaoCreateOrConnectWithoutDeStatusInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutDeStatusInput | LogMovimentacaoUpsertWithWhereUniqueWithoutDeStatusInput[]
    createMany?: LogMovimentacaoCreateManyDeStatusInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutDeStatusInput | LogMovimentacaoUpdateWithWhereUniqueWithoutDeStatusInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutDeStatusInput | LogMovimentacaoUpdateManyWithWhereWithoutDeStatusInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutParaStatusNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput> | LogMovimentacaoCreateWithoutParaStatusInput[] | LogMovimentacaoUncheckedCreateWithoutParaStatusInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutParaStatusInput | LogMovimentacaoCreateOrConnectWithoutParaStatusInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutParaStatusInput | LogMovimentacaoUpsertWithWhereUniqueWithoutParaStatusInput[]
    createMany?: LogMovimentacaoCreateManyParaStatusInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutParaStatusInput | LogMovimentacaoUpdateWithWhereUniqueWithoutParaStatusInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutParaStatusInput | LogMovimentacaoUpdateManyWithWhereWithoutParaStatusInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type PedidoStatusCreateNestedOneWithoutPedidosInput = {
    create?: XOR<PedidoStatusCreateWithoutPedidosInput, PedidoStatusUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutPedidosInput
    connect?: PedidoStatusWhereUniqueInput
  }

  export type EmpresaCreateNestedOneWithoutPedidosInput = {
    create?: XOR<EmpresaCreateWithoutPedidosInput, EmpresaUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutPedidosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type PedidoItemCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type FormaPagamentoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<FormaPagamentoCreateWithoutPedidosInput, FormaPagamentoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: FormaPagamentoCreateOrConnectWithoutPedidosInput
    connect?: FormaPagamentoWhereUniqueInput
  }

  export type EnderecoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<EnderecoCreateWithoutPedidosInput, EnderecoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: EnderecoCreateOrConnectWithoutPedidosInput
    connect?: EnderecoWhereUniqueInput
  }

  export type FontePedidoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<FontePedidoCreateWithoutPedidosInput, FontePedidoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: FontePedidoCreateOrConnectWithoutPedidosInput
    connect?: FontePedidoWhereUniqueInput
  }

  export type LogMovimentacaoCreateNestedManyWithoutPedidoInput = {
    create?: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput> | LogMovimentacaoCreateWithoutPedidoInput[] | LogMovimentacaoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutPedidoInput | LogMovimentacaoCreateOrConnectWithoutPedidoInput[]
    createMany?: LogMovimentacaoCreateManyPedidoInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type PedidoItemUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput> | LogMovimentacaoCreateWithoutPedidoInput[] | LogMovimentacaoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutPedidoInput | LogMovimentacaoCreateOrConnectWithoutPedidoInput[]
    createMany?: LogMovimentacaoCreateManyPedidoInputEnvelope
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
  }

  export type PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<PedidoStatusCreateWithoutPedidosInput, PedidoStatusUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutPedidosInput
    upsert?: PedidoStatusUpsertWithoutPedidosInput
    connect?: PedidoStatusWhereUniqueInput
    update?: XOR<XOR<PedidoStatusUpdateToOneWithWhereWithoutPedidosInput, PedidoStatusUpdateWithoutPedidosInput>, PedidoStatusUncheckedUpdateWithoutPedidosInput>
  }

  export type EmpresaUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<EmpresaCreateWithoutPedidosInput, EmpresaUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutPedidosInput
    upsert?: EmpresaUpsertWithoutPedidosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutPedidosInput, EmpresaUpdateWithoutPedidosInput>, EmpresaUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoItemUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<FormaPagamentoCreateWithoutPedidosInput, FormaPagamentoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: FormaPagamentoCreateOrConnectWithoutPedidosInput
    upsert?: FormaPagamentoUpsertWithoutPedidosInput
    connect?: FormaPagamentoWhereUniqueInput
    update?: XOR<XOR<FormaPagamentoUpdateToOneWithWhereWithoutPedidosInput, FormaPagamentoUpdateWithoutPedidosInput>, FormaPagamentoUncheckedUpdateWithoutPedidosInput>
  }

  export type EnderecoUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<EnderecoCreateWithoutPedidosInput, EnderecoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: EnderecoCreateOrConnectWithoutPedidosInput
    upsert?: EnderecoUpsertWithoutPedidosInput
    disconnect?: EnderecoWhereInput | boolean
    delete?: EnderecoWhereInput | boolean
    connect?: EnderecoWhereUniqueInput
    update?: XOR<XOR<EnderecoUpdateToOneWithWhereWithoutPedidosInput, EnderecoUpdateWithoutPedidosInput>, EnderecoUncheckedUpdateWithoutPedidosInput>
  }

  export type FontePedidoUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<FontePedidoCreateWithoutPedidosInput, FontePedidoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: FontePedidoCreateOrConnectWithoutPedidosInput
    upsert?: FontePedidoUpsertWithoutPedidosInput
    connect?: FontePedidoWhereUniqueInput
    update?: XOR<XOR<FontePedidoUpdateToOneWithWhereWithoutPedidosInput, FontePedidoUpdateWithoutPedidosInput>, FontePedidoUncheckedUpdateWithoutPedidosInput>
  }

  export type LogMovimentacaoUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput> | LogMovimentacaoCreateWithoutPedidoInput[] | LogMovimentacaoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutPedidoInput | LogMovimentacaoCreateOrConnectWithoutPedidoInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutPedidoInput | LogMovimentacaoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: LogMovimentacaoCreateManyPedidoInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutPedidoInput | LogMovimentacaoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutPedidoInput | LogMovimentacaoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput> | LogMovimentacaoCreateWithoutPedidoInput[] | LogMovimentacaoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: LogMovimentacaoCreateOrConnectWithoutPedidoInput | LogMovimentacaoCreateOrConnectWithoutPedidoInput[]
    upsert?: LogMovimentacaoUpsertWithWhereUniqueWithoutPedidoInput | LogMovimentacaoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: LogMovimentacaoCreateManyPedidoInputEnvelope
    set?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    disconnect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    delete?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    connect?: LogMovimentacaoWhereUniqueInput | LogMovimentacaoWhereUniqueInput[]
    update?: LogMovimentacaoUpdateWithWhereUniqueWithoutPedidoInput | LogMovimentacaoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: LogMovimentacaoUpdateManyWithWhereWithoutPedidoInput | LogMovimentacaoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutItensInput = {
    create?: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItensInput
    connect?: PedidoWhereUniqueInput
  }

  export type ProdutoCreateNestedOneWithoutItensPedidoInput = {
    create?: XOR<ProdutoCreateWithoutItensPedidoInput, ProdutoUncheckedCreateWithoutItensPedidoInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutItensPedidoInput
    connect?: ProdutoWhereUniqueInput
  }

  export type PedidoUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItensInput
    upsert?: PedidoUpsertWithoutItensInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutItensInput, PedidoUpdateWithoutItensInput>, PedidoUncheckedUpdateWithoutItensInput>
  }

  export type ProdutoUpdateOneRequiredWithoutItensPedidoNestedInput = {
    create?: XOR<ProdutoCreateWithoutItensPedidoInput, ProdutoUncheckedCreateWithoutItensPedidoInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutItensPedidoInput
    upsert?: ProdutoUpsertWithoutItensPedidoInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutItensPedidoInput, ProdutoUpdateWithoutItensPedidoInput>, ProdutoUncheckedUpdateWithoutItensPedidoInput>
  }

  export type EmpresaCreateNestedOneWithoutProdutosInput = {
    create?: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutProdutosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type PedidoItemCreateNestedManyWithoutProdutoInput = {
    create?: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput> | PedidoItemCreateWithoutProdutoInput[] | PedidoItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProdutoInput | PedidoItemCreateOrConnectWithoutProdutoInput[]
    createMany?: PedidoItemCreateManyProdutoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type PedidoItemUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput> | PedidoItemCreateWithoutProdutoInput[] | PedidoItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProdutoInput | PedidoItemCreateOrConnectWithoutProdutoInput[]
    createMany?: PedidoItemCreateManyProdutoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type EmpresaUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutProdutosInput
    upsert?: EmpresaUpsertWithoutProdutosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutProdutosInput, EmpresaUpdateWithoutProdutosInput>, EmpresaUncheckedUpdateWithoutProdutosInput>
  }

  export type PedidoItemUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput> | PedidoItemCreateWithoutProdutoInput[] | PedidoItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProdutoInput | PedidoItemCreateOrConnectWithoutProdutoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutProdutoInput | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: PedidoItemCreateManyProdutoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutProdutoInput | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutProdutoInput | PedidoItemUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput> | PedidoItemCreateWithoutProdutoInput[] | PedidoItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProdutoInput | PedidoItemCreateOrConnectWithoutProdutoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutProdutoInput | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: PedidoItemCreateManyProdutoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutProdutoInput | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutProdutoInput | PedidoItemUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PedidoCreateNestedManyWithoutPagamentoInput = {
    create?: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput> | PedidoCreateWithoutPagamentoInput[] | PedidoUncheckedCreateWithoutPagamentoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutPagamentoInput | PedidoCreateOrConnectWithoutPagamentoInput[]
    createMany?: PedidoCreateManyPagamentoInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutPagamentoInput = {
    create?: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput> | PedidoCreateWithoutPagamentoInput[] | PedidoUncheckedCreateWithoutPagamentoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutPagamentoInput | PedidoCreateOrConnectWithoutPagamentoInput[]
    createMany?: PedidoCreateManyPagamentoInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUpdateManyWithoutPagamentoNestedInput = {
    create?: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput> | PedidoCreateWithoutPagamentoInput[] | PedidoUncheckedCreateWithoutPagamentoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutPagamentoInput | PedidoCreateOrConnectWithoutPagamentoInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutPagamentoInput | PedidoUpsertWithWhereUniqueWithoutPagamentoInput[]
    createMany?: PedidoCreateManyPagamentoInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutPagamentoInput | PedidoUpdateWithWhereUniqueWithoutPagamentoInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutPagamentoInput | PedidoUpdateManyWithWhereWithoutPagamentoInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutPagamentoNestedInput = {
    create?: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput> | PedidoCreateWithoutPagamentoInput[] | PedidoUncheckedCreateWithoutPagamentoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutPagamentoInput | PedidoCreateOrConnectWithoutPagamentoInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutPagamentoInput | PedidoUpsertWithWhereUniqueWithoutPagamentoInput[]
    createMany?: PedidoCreateManyPagamentoInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutPagamentoInput | PedidoUpdateWithWhereUniqueWithoutPagamentoInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutPagamentoInput | PedidoUpdateManyWithWhereWithoutPagamentoInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoCreateNestedManyWithoutFonteInput = {
    create?: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput> | PedidoCreateWithoutFonteInput[] | PedidoUncheckedCreateWithoutFonteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutFonteInput | PedidoCreateOrConnectWithoutFonteInput[]
    createMany?: PedidoCreateManyFonteInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutFonteInput = {
    create?: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput> | PedidoCreateWithoutFonteInput[] | PedidoUncheckedCreateWithoutFonteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutFonteInput | PedidoCreateOrConnectWithoutFonteInput[]
    createMany?: PedidoCreateManyFonteInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUpdateManyWithoutFonteNestedInput = {
    create?: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput> | PedidoCreateWithoutFonteInput[] | PedidoUncheckedCreateWithoutFonteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutFonteInput | PedidoCreateOrConnectWithoutFonteInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutFonteInput | PedidoUpsertWithWhereUniqueWithoutFonteInput[]
    createMany?: PedidoCreateManyFonteInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutFonteInput | PedidoUpdateWithWhereUniqueWithoutFonteInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutFonteInput | PedidoUpdateManyWithWhereWithoutFonteInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutFonteNestedInput = {
    create?: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput> | PedidoCreateWithoutFonteInput[] | PedidoUncheckedCreateWithoutFonteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutFonteInput | PedidoCreateOrConnectWithoutFonteInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutFonteInput | PedidoUpsertWithWhereUniqueWithoutFonteInput[]
    createMany?: PedidoCreateManyFonteInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutFonteInput | PedidoUpdateWithWhereUniqueWithoutFonteInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutFonteInput | PedidoUpdateManyWithWhereWithoutFonteInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoCreateNestedManyWithoutEnderecoInput = {
    create?: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput> | PedidoCreateWithoutEnderecoInput[] | PedidoUncheckedCreateWithoutEnderecoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEnderecoInput | PedidoCreateOrConnectWithoutEnderecoInput[]
    createMany?: PedidoCreateManyEnderecoInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutEnderecoInput = {
    create?: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput> | PedidoCreateWithoutEnderecoInput[] | PedidoUncheckedCreateWithoutEnderecoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEnderecoInput | PedidoCreateOrConnectWithoutEnderecoInput[]
    createMany?: PedidoCreateManyEnderecoInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type PedidoUpdateManyWithoutEnderecoNestedInput = {
    create?: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput> | PedidoCreateWithoutEnderecoInput[] | PedidoUncheckedCreateWithoutEnderecoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEnderecoInput | PedidoCreateOrConnectWithoutEnderecoInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutEnderecoInput | PedidoUpsertWithWhereUniqueWithoutEnderecoInput[]
    createMany?: PedidoCreateManyEnderecoInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutEnderecoInput | PedidoUpdateWithWhereUniqueWithoutEnderecoInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutEnderecoInput | PedidoUpdateManyWithWhereWithoutEnderecoInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutEnderecoNestedInput = {
    create?: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput> | PedidoCreateWithoutEnderecoInput[] | PedidoUncheckedCreateWithoutEnderecoInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutEnderecoInput | PedidoCreateOrConnectWithoutEnderecoInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutEnderecoInput | PedidoUpsertWithWhereUniqueWithoutEnderecoInput[]
    createMany?: PedidoCreateManyEnderecoInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutEnderecoInput | PedidoUpdateWithWhereUniqueWithoutEnderecoInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutEnderecoInput | PedidoUpdateManyWithWhereWithoutEnderecoInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutLogsInput = {
    create?: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutLogsInput
    connect?: PedidoWhereUniqueInput
  }

  export type PedidoStatusCreateNestedOneWithoutLogsOrigemInput = {
    create?: XOR<PedidoStatusCreateWithoutLogsOrigemInput, PedidoStatusUncheckedCreateWithoutLogsOrigemInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutLogsOrigemInput
    connect?: PedidoStatusWhereUniqueInput
  }

  export type PedidoStatusCreateNestedOneWithoutLogsDestinoInput = {
    create?: XOR<PedidoStatusCreateWithoutLogsDestinoInput, PedidoStatusUncheckedCreateWithoutLogsDestinoInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutLogsDestinoInput
    connect?: PedidoStatusWhereUniqueInput
  }

  export type PedidoUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutLogsInput
    upsert?: PedidoUpsertWithoutLogsInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutLogsInput, PedidoUpdateWithoutLogsInput>, PedidoUncheckedUpdateWithoutLogsInput>
  }

  export type PedidoStatusUpdateOneWithoutLogsOrigemNestedInput = {
    create?: XOR<PedidoStatusCreateWithoutLogsOrigemInput, PedidoStatusUncheckedCreateWithoutLogsOrigemInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutLogsOrigemInput
    upsert?: PedidoStatusUpsertWithoutLogsOrigemInput
    disconnect?: PedidoStatusWhereInput | boolean
    delete?: PedidoStatusWhereInput | boolean
    connect?: PedidoStatusWhereUniqueInput
    update?: XOR<XOR<PedidoStatusUpdateToOneWithWhereWithoutLogsOrigemInput, PedidoStatusUpdateWithoutLogsOrigemInput>, PedidoStatusUncheckedUpdateWithoutLogsOrigemInput>
  }

  export type PedidoStatusUpdateOneRequiredWithoutLogsDestinoNestedInput = {
    create?: XOR<PedidoStatusCreateWithoutLogsDestinoInput, PedidoStatusUncheckedCreateWithoutLogsDestinoInput>
    connectOrCreate?: PedidoStatusCreateOrConnectWithoutLogsDestinoInput
    upsert?: PedidoStatusUpsertWithoutLogsDestinoInput
    connect?: PedidoStatusWhereUniqueInput
    update?: XOR<XOR<PedidoStatusUpdateToOneWithWhereWithoutLogsDestinoInput, PedidoStatusUpdateWithoutLogsDestinoInput>, PedidoStatusUncheckedUpdateWithoutLogsDestinoInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PlanoCreateWithoutEmpresasInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    assinaturas?: AssinaturaCreateNestedManyWithoutPlanoInput
  }

  export type PlanoUncheckedCreateWithoutEmpresasInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    assinaturas?: AssinaturaUncheckedCreateNestedManyWithoutPlanoInput
  }

  export type PlanoCreateOrConnectWithoutEmpresasInput = {
    where: PlanoWhereUniqueInput
    create: XOR<PlanoCreateWithoutEmpresasInput, PlanoUncheckedCreateWithoutEmpresasInput>
  }

  export type UsuarioCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
  }

  export type UsuarioUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
  }

  export type UsuarioCreateOrConnectWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput>
  }

  export type UsuarioCreateManyEmpresaInputEnvelope = {
    data: UsuarioCreateManyEmpresaInput | UsuarioCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type BoardCreateWithoutEmpresaInput = {
    id?: string
    titulo: string
    createdAt?: Date | string
    listas?: PedidoStatusCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateWithoutEmpresaInput = {
    id?: string
    titulo: string
    createdAt?: Date | string
    listas?: PedidoStatusUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardCreateOrConnectWithoutEmpresaInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput>
  }

  export type BoardCreateManyEmpresaInputEnvelope = {
    data: BoardCreateManyEmpresaInput | BoardCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type PedidoCreateWithoutEmpresaInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutEmpresaInput = {
    id?: string
    statusId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutEmpresaInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput>
  }

  export type PedidoCreateManyEmpresaInputEnvelope = {
    data: PedidoCreateManyEmpresaInput | PedidoCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ProdutoCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
    itensPedido?: PedidoItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
    itensPedido?: PedidoItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutEmpresaInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput>
  }

  export type ProdutoCreateManyEmpresaInputEnvelope = {
    data: ProdutoCreateManyEmpresaInput | ProdutoCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type AssinaturaCreateWithoutEmpresaInput = {
    id?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    plano: PlanoCreateNestedOneWithoutAssinaturasInput
  }

  export type AssinaturaUncheckedCreateWithoutEmpresaInput = {
    id?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    planoId: string
  }

  export type AssinaturaCreateOrConnectWithoutEmpresaInput = {
    where: AssinaturaWhereUniqueInput
    create: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
  }

  export type PlanoUpsertWithoutEmpresasInput = {
    update: XOR<PlanoUpdateWithoutEmpresasInput, PlanoUncheckedUpdateWithoutEmpresasInput>
    create: XOR<PlanoCreateWithoutEmpresasInput, PlanoUncheckedCreateWithoutEmpresasInput>
    where?: PlanoWhereInput
  }

  export type PlanoUpdateToOneWithWhereWithoutEmpresasInput = {
    where?: PlanoWhereInput
    data: XOR<PlanoUpdateWithoutEmpresasInput, PlanoUncheckedUpdateWithoutEmpresasInput>
  }

  export type PlanoUpdateWithoutEmpresasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    assinaturas?: AssinaturaUpdateManyWithoutPlanoNestedInput
  }

  export type PlanoUncheckedUpdateWithoutEmpresasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    assinaturas?: AssinaturaUncheckedUpdateManyWithoutPlanoNestedInput
  }

  export type UsuarioUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutEmpresaInput, UsuarioUncheckedUpdateWithoutEmpresaInput>
    create: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutEmpresaInput, UsuarioUncheckedUpdateWithoutEmpresaInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutEmpresaInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    empresaId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
  }

  export type BoardUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: BoardWhereUniqueInput
    update: XOR<BoardUpdateWithoutEmpresaInput, BoardUncheckedUpdateWithoutEmpresaInput>
    create: XOR<BoardCreateWithoutEmpresaInput, BoardUncheckedCreateWithoutEmpresaInput>
  }

  export type BoardUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: BoardWhereUniqueInput
    data: XOR<BoardUpdateWithoutEmpresaInput, BoardUncheckedUpdateWithoutEmpresaInput>
  }

  export type BoardUpdateManyWithWhereWithoutEmpresaInput = {
    where: BoardScalarWhereInput
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type BoardScalarWhereInput = {
    AND?: BoardScalarWhereInput | BoardScalarWhereInput[]
    OR?: BoardScalarWhereInput[]
    NOT?: BoardScalarWhereInput | BoardScalarWhereInput[]
    id?: StringFilter<"Board"> | string
    empresaId?: StringFilter<"Board"> | string
    titulo?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
  }

  export type PedidoUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutEmpresaInput, PedidoUncheckedUpdateWithoutEmpresaInput>
    create: XOR<PedidoCreateWithoutEmpresaInput, PedidoUncheckedCreateWithoutEmpresaInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutEmpresaInput, PedidoUncheckedUpdateWithoutEmpresaInput>
  }

  export type PedidoUpdateManyWithWhereWithoutEmpresaInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type PedidoScalarWhereInput = {
    AND?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    OR?: PedidoScalarWhereInput[]
    NOT?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    id?: StringFilter<"Pedido"> | string
    statusId?: StringFilter<"Pedido"> | string
    empresaId?: StringFilter<"Pedido"> | string
    codigo?: StringFilter<"Pedido"> | string
    fonteId?: StringFilter<"Pedido"> | string
    pagamentoId?: StringFilter<"Pedido"> | string
    enderecoId?: StringNullableFilter<"Pedido"> | string | null
    desconto?: FloatFilter<"Pedido"> | number
    taxaEntrega?: FloatFilter<"Pedido"> | number
    valorTotal?: FloatFilter<"Pedido"> | number
    observacao?: StringNullableFilter<"Pedido"> | string | null
    criadoEm?: DateTimeFilter<"Pedido"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"Pedido"> | Date | string | null
  }

  export type ProdutoUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutEmpresaInput, ProdutoUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ProdutoCreateWithoutEmpresaInput, ProdutoUncheckedCreateWithoutEmpresaInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutEmpresaInput, ProdutoUncheckedUpdateWithoutEmpresaInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutEmpresaInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ProdutoScalarWhereInput = {
    AND?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    OR?: ProdutoScalarWhereInput[]
    NOT?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    id?: StringFilter<"Produto"> | string
    empresaId?: StringFilter<"Produto"> | string
    nome?: StringFilter<"Produto"> | string
    descricao?: StringNullableFilter<"Produto"> | string | null
    precoBase?: FloatFilter<"Produto"> | number
    ativo?: BoolFilter<"Produto"> | boolean
  }

  export type AssinaturaUpsertWithoutEmpresaInput = {
    update: XOR<AssinaturaUpdateWithoutEmpresaInput, AssinaturaUncheckedUpdateWithoutEmpresaInput>
    create: XOR<AssinaturaCreateWithoutEmpresaInput, AssinaturaUncheckedCreateWithoutEmpresaInput>
    where?: AssinaturaWhereInput
  }

  export type AssinaturaUpdateToOneWithWhereWithoutEmpresaInput = {
    where?: AssinaturaWhereInput
    data: XOR<AssinaturaUpdateWithoutEmpresaInput, AssinaturaUncheckedUpdateWithoutEmpresaInput>
  }

  export type AssinaturaUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plano?: PlanoUpdateOneRequiredWithoutAssinaturasNestedInput
  }

  export type AssinaturaUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    planoId?: StringFieldUpdateOperationsInput | string
  }

  export type EmpresaCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutUsuariosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
  }

  export type EmpresaUpsertWithoutUsuariosInput = {
    update: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type EmpresaUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaCreateWithoutPlanoInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutPlanoInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutPlanoInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput>
  }

  export type EmpresaCreateManyPlanoInputEnvelope = {
    data: EmpresaCreateManyPlanoInput | EmpresaCreateManyPlanoInput[]
    skipDuplicates?: boolean
  }

  export type AssinaturaCreateWithoutPlanoInput = {
    id?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
    empresa: EmpresaCreateNestedOneWithoutAssinaturaInput
  }

  export type AssinaturaUncheckedCreateWithoutPlanoInput = {
    id?: string
    empresaId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
  }

  export type AssinaturaCreateOrConnectWithoutPlanoInput = {
    where: AssinaturaWhereUniqueInput
    create: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput>
  }

  export type AssinaturaCreateManyPlanoInputEnvelope = {
    data: AssinaturaCreateManyPlanoInput | AssinaturaCreateManyPlanoInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithWhereUniqueWithoutPlanoInput = {
    where: EmpresaWhereUniqueInput
    update: XOR<EmpresaUpdateWithoutPlanoInput, EmpresaUncheckedUpdateWithoutPlanoInput>
    create: XOR<EmpresaCreateWithoutPlanoInput, EmpresaUncheckedCreateWithoutPlanoInput>
  }

  export type EmpresaUpdateWithWhereUniqueWithoutPlanoInput = {
    where: EmpresaWhereUniqueInput
    data: XOR<EmpresaUpdateWithoutPlanoInput, EmpresaUncheckedUpdateWithoutPlanoInput>
  }

  export type EmpresaUpdateManyWithWhereWithoutPlanoInput = {
    where: EmpresaScalarWhereInput
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyWithoutPlanoInput>
  }

  export type EmpresaScalarWhereInput = {
    AND?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    OR?: EmpresaScalarWhereInput[]
    NOT?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    id?: StringFilter<"Empresa"> | string
    nome?: StringFilter<"Empresa"> | string
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    telefone?: StringNullableFilter<"Empresa"> | string | null
    planoAtualId?: StringFilter<"Empresa"> | string
    criadaEm?: DateTimeFilter<"Empresa"> | Date | string
  }

  export type AssinaturaUpsertWithWhereUniqueWithoutPlanoInput = {
    where: AssinaturaWhereUniqueInput
    update: XOR<AssinaturaUpdateWithoutPlanoInput, AssinaturaUncheckedUpdateWithoutPlanoInput>
    create: XOR<AssinaturaCreateWithoutPlanoInput, AssinaturaUncheckedCreateWithoutPlanoInput>
  }

  export type AssinaturaUpdateWithWhereUniqueWithoutPlanoInput = {
    where: AssinaturaWhereUniqueInput
    data: XOR<AssinaturaUpdateWithoutPlanoInput, AssinaturaUncheckedUpdateWithoutPlanoInput>
  }

  export type AssinaturaUpdateManyWithWhereWithoutPlanoInput = {
    where: AssinaturaScalarWhereInput
    data: XOR<AssinaturaUpdateManyMutationInput, AssinaturaUncheckedUpdateManyWithoutPlanoInput>
  }

  export type AssinaturaScalarWhereInput = {
    AND?: AssinaturaScalarWhereInput | AssinaturaScalarWhereInput[]
    OR?: AssinaturaScalarWhereInput[]
    NOT?: AssinaturaScalarWhereInput | AssinaturaScalarWhereInput[]
    id?: StringFilter<"Assinatura"> | string
    empresaId?: StringFilter<"Assinatura"> | string
    stripeCustomerId?: StringNullableFilter<"Assinatura"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Assinatura"> | string | null
    periodoFim?: DateTimeNullableFilter<"Assinatura"> | Date | string | null
    planoId?: StringFilter<"Assinatura"> | string
  }

  export type EmpresaCreateWithoutAssinaturaInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutAssinaturaInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutAssinaturaInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutAssinaturaInput, EmpresaUncheckedCreateWithoutAssinaturaInput>
  }

  export type PlanoCreateWithoutAssinaturasInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    empresas?: EmpresaCreateNestedManyWithoutPlanoInput
  }

  export type PlanoUncheckedCreateWithoutAssinaturasInput = {
    id?: string
    nome: string
    limitePedidosMes: number
    precoMensal: number
    ativo?: boolean
    empresas?: EmpresaUncheckedCreateNestedManyWithoutPlanoInput
  }

  export type PlanoCreateOrConnectWithoutAssinaturasInput = {
    where: PlanoWhereUniqueInput
    create: XOR<PlanoCreateWithoutAssinaturasInput, PlanoUncheckedCreateWithoutAssinaturasInput>
  }

  export type EmpresaUpsertWithoutAssinaturaInput = {
    update: XOR<EmpresaUpdateWithoutAssinaturaInput, EmpresaUncheckedUpdateWithoutAssinaturaInput>
    create: XOR<EmpresaCreateWithoutAssinaturaInput, EmpresaUncheckedCreateWithoutAssinaturaInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutAssinaturaInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutAssinaturaInput, EmpresaUncheckedUpdateWithoutAssinaturaInput>
  }

  export type EmpresaUpdateWithoutAssinaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutAssinaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type PlanoUpsertWithoutAssinaturasInput = {
    update: XOR<PlanoUpdateWithoutAssinaturasInput, PlanoUncheckedUpdateWithoutAssinaturasInput>
    create: XOR<PlanoCreateWithoutAssinaturasInput, PlanoUncheckedCreateWithoutAssinaturasInput>
    where?: PlanoWhereInput
  }

  export type PlanoUpdateToOneWithWhereWithoutAssinaturasInput = {
    where?: PlanoWhereInput
    data: XOR<PlanoUpdateWithoutAssinaturasInput, PlanoUncheckedUpdateWithoutAssinaturasInput>
  }

  export type PlanoUpdateWithoutAssinaturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresas?: EmpresaUpdateManyWithoutPlanoNestedInput
  }

  export type PlanoUncheckedUpdateWithoutAssinaturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    limitePedidosMes?: IntFieldUpdateOperationsInput | number
    precoMensal?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresas?: EmpresaUncheckedUpdateManyWithoutPlanoNestedInput
  }

  export type EmpresaCreateWithoutBoardsInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutBoardsInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutBoardsInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutBoardsInput, EmpresaUncheckedCreateWithoutBoardsInput>
  }

  export type PedidoStatusCreateWithoutBoardInput = {
    id?: string
    titulo: string
    ordem: number
    pedidos?: PedidoCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusUncheckedCreateWithoutBoardInput = {
    id?: string
    titulo: string
    ordem: number
    pedidos?: PedidoUncheckedCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoUncheckedCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoUncheckedCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusCreateOrConnectWithoutBoardInput = {
    where: PedidoStatusWhereUniqueInput
    create: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput>
  }

  export type PedidoStatusCreateManyBoardInputEnvelope = {
    data: PedidoStatusCreateManyBoardInput | PedidoStatusCreateManyBoardInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutBoardsInput = {
    update: XOR<EmpresaUpdateWithoutBoardsInput, EmpresaUncheckedUpdateWithoutBoardsInput>
    create: XOR<EmpresaCreateWithoutBoardsInput, EmpresaUncheckedCreateWithoutBoardsInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutBoardsInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutBoardsInput, EmpresaUncheckedUpdateWithoutBoardsInput>
  }

  export type EmpresaUpdateWithoutBoardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutBoardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type PedidoStatusUpsertWithWhereUniqueWithoutBoardInput = {
    where: PedidoStatusWhereUniqueInput
    update: XOR<PedidoStatusUpdateWithoutBoardInput, PedidoStatusUncheckedUpdateWithoutBoardInput>
    create: XOR<PedidoStatusCreateWithoutBoardInput, PedidoStatusUncheckedCreateWithoutBoardInput>
  }

  export type PedidoStatusUpdateWithWhereUniqueWithoutBoardInput = {
    where: PedidoStatusWhereUniqueInput
    data: XOR<PedidoStatusUpdateWithoutBoardInput, PedidoStatusUncheckedUpdateWithoutBoardInput>
  }

  export type PedidoStatusUpdateManyWithWhereWithoutBoardInput = {
    where: PedidoStatusScalarWhereInput
    data: XOR<PedidoStatusUpdateManyMutationInput, PedidoStatusUncheckedUpdateManyWithoutBoardInput>
  }

  export type PedidoStatusScalarWhereInput = {
    AND?: PedidoStatusScalarWhereInput | PedidoStatusScalarWhereInput[]
    OR?: PedidoStatusScalarWhereInput[]
    NOT?: PedidoStatusScalarWhereInput | PedidoStatusScalarWhereInput[]
    id?: StringFilter<"PedidoStatus"> | string
    boardId?: StringFilter<"PedidoStatus"> | string
    titulo?: StringFilter<"PedidoStatus"> | string
    ordem?: IntFilter<"PedidoStatus"> | number
  }

  export type BoardCreateWithoutListasInput = {
    id?: string
    titulo: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutBoardsInput
  }

  export type BoardUncheckedCreateWithoutListasInput = {
    id?: string
    empresaId: string
    titulo: string
    createdAt?: Date | string
  }

  export type BoardCreateOrConnectWithoutListasInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutListasInput, BoardUncheckedCreateWithoutListasInput>
  }

  export type PedidoCreateWithoutStatusInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutStatusInput = {
    id?: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutStatusInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput>
  }

  export type PedidoCreateManyStatusInputEnvelope = {
    data: PedidoCreateManyStatusInput | PedidoCreateManyStatusInput[]
    skipDuplicates?: boolean
  }

  export type LogMovimentacaoCreateWithoutDeStatusInput = {
    id?: string
    dataMovimentacao?: Date | string
    pedido: PedidoCreateNestedOneWithoutLogsInput
    paraStatus: PedidoStatusCreateNestedOneWithoutLogsDestinoInput
  }

  export type LogMovimentacaoUncheckedCreateWithoutDeStatusInput = {
    id?: string
    pedidoId: string
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoCreateOrConnectWithoutDeStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    create: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput>
  }

  export type LogMovimentacaoCreateManyDeStatusInputEnvelope = {
    data: LogMovimentacaoCreateManyDeStatusInput | LogMovimentacaoCreateManyDeStatusInput[]
    skipDuplicates?: boolean
  }

  export type LogMovimentacaoCreateWithoutParaStatusInput = {
    id?: string
    dataMovimentacao?: Date | string
    pedido: PedidoCreateNestedOneWithoutLogsInput
    deStatus?: PedidoStatusCreateNestedOneWithoutLogsOrigemInput
  }

  export type LogMovimentacaoUncheckedCreateWithoutParaStatusInput = {
    id?: string
    pedidoId: string
    deStatusId?: string | null
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoCreateOrConnectWithoutParaStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    create: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput>
  }

  export type LogMovimentacaoCreateManyParaStatusInputEnvelope = {
    data: LogMovimentacaoCreateManyParaStatusInput | LogMovimentacaoCreateManyParaStatusInput[]
    skipDuplicates?: boolean
  }

  export type BoardUpsertWithoutListasInput = {
    update: XOR<BoardUpdateWithoutListasInput, BoardUncheckedUpdateWithoutListasInput>
    create: XOR<BoardCreateWithoutListasInput, BoardUncheckedCreateWithoutListasInput>
    where?: BoardWhereInput
  }

  export type BoardUpdateToOneWithWhereWithoutListasInput = {
    where?: BoardWhereInput
    data: XOR<BoardUpdateWithoutListasInput, BoardUncheckedUpdateWithoutListasInput>
  }

  export type BoardUpdateWithoutListasInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutBoardsNestedInput
  }

  export type BoardUncheckedUpdateWithoutListasInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUpsertWithWhereUniqueWithoutStatusInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutStatusInput, PedidoUncheckedUpdateWithoutStatusInput>
    create: XOR<PedidoCreateWithoutStatusInput, PedidoUncheckedCreateWithoutStatusInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutStatusInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutStatusInput, PedidoUncheckedUpdateWithoutStatusInput>
  }

  export type PedidoUpdateManyWithWhereWithoutStatusInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutStatusInput>
  }

  export type LogMovimentacaoUpsertWithWhereUniqueWithoutDeStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    update: XOR<LogMovimentacaoUpdateWithoutDeStatusInput, LogMovimentacaoUncheckedUpdateWithoutDeStatusInput>
    create: XOR<LogMovimentacaoCreateWithoutDeStatusInput, LogMovimentacaoUncheckedCreateWithoutDeStatusInput>
  }

  export type LogMovimentacaoUpdateWithWhereUniqueWithoutDeStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    data: XOR<LogMovimentacaoUpdateWithoutDeStatusInput, LogMovimentacaoUncheckedUpdateWithoutDeStatusInput>
  }

  export type LogMovimentacaoUpdateManyWithWhereWithoutDeStatusInput = {
    where: LogMovimentacaoScalarWhereInput
    data: XOR<LogMovimentacaoUpdateManyMutationInput, LogMovimentacaoUncheckedUpdateManyWithoutDeStatusInput>
  }

  export type LogMovimentacaoScalarWhereInput = {
    AND?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
    OR?: LogMovimentacaoScalarWhereInput[]
    NOT?: LogMovimentacaoScalarWhereInput | LogMovimentacaoScalarWhereInput[]
    id?: StringFilter<"LogMovimentacao"> | string
    pedidoId?: StringFilter<"LogMovimentacao"> | string
    deStatusId?: StringNullableFilter<"LogMovimentacao"> | string | null
    paraStatusId?: StringFilter<"LogMovimentacao"> | string
    dataMovimentacao?: DateTimeFilter<"LogMovimentacao"> | Date | string
  }

  export type LogMovimentacaoUpsertWithWhereUniqueWithoutParaStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    update: XOR<LogMovimentacaoUpdateWithoutParaStatusInput, LogMovimentacaoUncheckedUpdateWithoutParaStatusInput>
    create: XOR<LogMovimentacaoCreateWithoutParaStatusInput, LogMovimentacaoUncheckedCreateWithoutParaStatusInput>
  }

  export type LogMovimentacaoUpdateWithWhereUniqueWithoutParaStatusInput = {
    where: LogMovimentacaoWhereUniqueInput
    data: XOR<LogMovimentacaoUpdateWithoutParaStatusInput, LogMovimentacaoUncheckedUpdateWithoutParaStatusInput>
  }

  export type LogMovimentacaoUpdateManyWithWhereWithoutParaStatusInput = {
    where: LogMovimentacaoScalarWhereInput
    data: XOR<LogMovimentacaoUpdateManyMutationInput, LogMovimentacaoUncheckedUpdateManyWithoutParaStatusInput>
  }

  export type PedidoStatusCreateWithoutPedidosInput = {
    id?: string
    titulo: string
    ordem: number
    board: BoardCreateNestedOneWithoutListasInput
    logsOrigem?: LogMovimentacaoCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusUncheckedCreateWithoutPedidosInput = {
    id?: string
    boardId: string
    titulo: string
    ordem: number
    logsOrigem?: LogMovimentacaoUncheckedCreateNestedManyWithoutDeStatusInput
    logsDestino?: LogMovimentacaoUncheckedCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusCreateOrConnectWithoutPedidosInput = {
    where: PedidoStatusWhereUniqueInput
    create: XOR<PedidoStatusCreateWithoutPedidosInput, PedidoStatusUncheckedCreateWithoutPedidosInput>
  }

  export type EmpresaCreateWithoutPedidosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutPedidosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutPedidosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutPedidosInput, EmpresaUncheckedCreateWithoutPedidosInput>
  }

  export type PedidoItemCreateWithoutPedidoInput = {
    id?: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
    produto: ProdutoCreateNestedOneWithoutItensPedidoInput
  }

  export type PedidoItemUncheckedCreateWithoutPedidoInput = {
    id?: string
    produtoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type PedidoItemCreateOrConnectWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemCreateManyPedidoInputEnvelope = {
    data: PedidoItemCreateManyPedidoInput | PedidoItemCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type FormaPagamentoCreateWithoutPedidosInput = {
    id?: string
    nome: string
  }

  export type FormaPagamentoUncheckedCreateWithoutPedidosInput = {
    id?: string
    nome: string
  }

  export type FormaPagamentoCreateOrConnectWithoutPedidosInput = {
    where: FormaPagamentoWhereUniqueInput
    create: XOR<FormaPagamentoCreateWithoutPedidosInput, FormaPagamentoUncheckedCreateWithoutPedidosInput>
  }

  export type EnderecoCreateWithoutPedidosInput = {
    id?: string
    rua: string
    numero: string
    complemento?: string | null
    bairro: string
    cidade: string
    uf: string
    cep?: string | null
    referencia?: string | null
  }

  export type EnderecoUncheckedCreateWithoutPedidosInput = {
    id?: string
    rua: string
    numero: string
    complemento?: string | null
    bairro: string
    cidade: string
    uf: string
    cep?: string | null
    referencia?: string | null
  }

  export type EnderecoCreateOrConnectWithoutPedidosInput = {
    where: EnderecoWhereUniqueInput
    create: XOR<EnderecoCreateWithoutPedidosInput, EnderecoUncheckedCreateWithoutPedidosInput>
  }

  export type FontePedidoCreateWithoutPedidosInput = {
    id?: string
    nome: string
    tipoIntegracao?: string | null
  }

  export type FontePedidoUncheckedCreateWithoutPedidosInput = {
    id?: string
    nome: string
    tipoIntegracao?: string | null
  }

  export type FontePedidoCreateOrConnectWithoutPedidosInput = {
    where: FontePedidoWhereUniqueInput
    create: XOR<FontePedidoCreateWithoutPedidosInput, FontePedidoUncheckedCreateWithoutPedidosInput>
  }

  export type LogMovimentacaoCreateWithoutPedidoInput = {
    id?: string
    dataMovimentacao?: Date | string
    deStatus?: PedidoStatusCreateNestedOneWithoutLogsOrigemInput
    paraStatus: PedidoStatusCreateNestedOneWithoutLogsDestinoInput
  }

  export type LogMovimentacaoUncheckedCreateWithoutPedidoInput = {
    id?: string
    deStatusId?: string | null
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoCreateOrConnectWithoutPedidoInput = {
    where: LogMovimentacaoWhereUniqueInput
    create: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput>
  }

  export type LogMovimentacaoCreateManyPedidoInputEnvelope = {
    data: LogMovimentacaoCreateManyPedidoInput | LogMovimentacaoCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoStatusUpsertWithoutPedidosInput = {
    update: XOR<PedidoStatusUpdateWithoutPedidosInput, PedidoStatusUncheckedUpdateWithoutPedidosInput>
    create: XOR<PedidoStatusCreateWithoutPedidosInput, PedidoStatusUncheckedCreateWithoutPedidosInput>
    where?: PedidoStatusWhereInput
  }

  export type PedidoStatusUpdateToOneWithWhereWithoutPedidosInput = {
    where?: PedidoStatusWhereInput
    data: XOR<PedidoStatusUpdateWithoutPedidosInput, PedidoStatusUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoStatusUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    board?: BoardUpdateOneRequiredWithoutListasNestedInput
    logsOrigem?: LogMovimentacaoUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    logsOrigem?: LogMovimentacaoUncheckedUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUncheckedUpdateManyWithoutParaStatusNestedInput
  }

  export type EmpresaUpsertWithoutPedidosInput = {
    update: XOR<EmpresaUpdateWithoutPedidosInput, EmpresaUncheckedUpdateWithoutPedidosInput>
    create: XOR<EmpresaCreateWithoutPedidosInput, EmpresaUncheckedCreateWithoutPedidosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutPedidosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutPedidosInput, EmpresaUncheckedUpdateWithoutPedidosInput>
  }

  export type EmpresaUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type PedidoItemUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    update: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    data: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoItemUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoItemScalarWhereInput
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutPedidoInput>
  }

  export type PedidoItemScalarWhereInput = {
    AND?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    OR?: PedidoItemScalarWhereInput[]
    NOT?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    id?: StringFilter<"PedidoItem"> | string
    pedidoId?: StringFilter<"PedidoItem"> | string
    produtoId?: StringFilter<"PedidoItem"> | string
    quantidade?: IntFilter<"PedidoItem"> | number
    precoUnitario?: FloatFilter<"PedidoItem"> | number
    observacao?: StringNullableFilter<"PedidoItem"> | string | null
  }

  export type FormaPagamentoUpsertWithoutPedidosInput = {
    update: XOR<FormaPagamentoUpdateWithoutPedidosInput, FormaPagamentoUncheckedUpdateWithoutPedidosInput>
    create: XOR<FormaPagamentoCreateWithoutPedidosInput, FormaPagamentoUncheckedCreateWithoutPedidosInput>
    where?: FormaPagamentoWhereInput
  }

  export type FormaPagamentoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: FormaPagamentoWhereInput
    data: XOR<FormaPagamentoUpdateWithoutPedidosInput, FormaPagamentoUncheckedUpdateWithoutPedidosInput>
  }

  export type FormaPagamentoUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type FormaPagamentoUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type EnderecoUpsertWithoutPedidosInput = {
    update: XOR<EnderecoUpdateWithoutPedidosInput, EnderecoUncheckedUpdateWithoutPedidosInput>
    create: XOR<EnderecoCreateWithoutPedidosInput, EnderecoUncheckedCreateWithoutPedidosInput>
    where?: EnderecoWhereInput
  }

  export type EnderecoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: EnderecoWhereInput
    data: XOR<EnderecoUpdateWithoutPedidosInput, EnderecoUncheckedUpdateWithoutPedidosInput>
  }

  export type EnderecoUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    referencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontePedidoUpsertWithoutPedidosInput = {
    update: XOR<FontePedidoUpdateWithoutPedidosInput, FontePedidoUncheckedUpdateWithoutPedidosInput>
    create: XOR<FontePedidoCreateWithoutPedidosInput, FontePedidoUncheckedCreateWithoutPedidosInput>
    where?: FontePedidoWhereInput
  }

  export type FontePedidoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: FontePedidoWhereInput
    data: XOR<FontePedidoUpdateWithoutPedidosInput, FontePedidoUncheckedUpdateWithoutPedidosInput>
  }

  export type FontePedidoUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontePedidoUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipoIntegracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogMovimentacaoUpsertWithWhereUniqueWithoutPedidoInput = {
    where: LogMovimentacaoWhereUniqueInput
    update: XOR<LogMovimentacaoUpdateWithoutPedidoInput, LogMovimentacaoUncheckedUpdateWithoutPedidoInput>
    create: XOR<LogMovimentacaoCreateWithoutPedidoInput, LogMovimentacaoUncheckedCreateWithoutPedidoInput>
  }

  export type LogMovimentacaoUpdateWithWhereUniqueWithoutPedidoInput = {
    where: LogMovimentacaoWhereUniqueInput
    data: XOR<LogMovimentacaoUpdateWithoutPedidoInput, LogMovimentacaoUncheckedUpdateWithoutPedidoInput>
  }

  export type LogMovimentacaoUpdateManyWithWhereWithoutPedidoInput = {
    where: LogMovimentacaoScalarWhereInput
    data: XOR<LogMovimentacaoUpdateManyMutationInput, LogMovimentacaoUncheckedUpdateManyWithoutPedidoInput>
  }

  export type PedidoCreateWithoutItensInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutItensInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutItensInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>
  }

  export type ProdutoCreateWithoutItensPedidoInput = {
    id?: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutItensPedidoInput = {
    id?: string
    empresaId: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
  }

  export type ProdutoCreateOrConnectWithoutItensPedidoInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutItensPedidoInput, ProdutoUncheckedCreateWithoutItensPedidoInput>
  }

  export type PedidoUpsertWithoutItensInput = {
    update: XOR<PedidoUpdateWithoutItensInput, PedidoUncheckedUpdateWithoutItensInput>
    create: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutItensInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutItensInput, PedidoUncheckedUpdateWithoutItensInput>
  }

  export type PedidoUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type ProdutoUpsertWithoutItensPedidoInput = {
    update: XOR<ProdutoUpdateWithoutItensPedidoInput, ProdutoUncheckedUpdateWithoutItensPedidoInput>
    create: XOR<ProdutoCreateWithoutItensPedidoInput, ProdutoUncheckedCreateWithoutItensPedidoInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutItensPedidoInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutItensPedidoInput, ProdutoUncheckedUpdateWithoutItensPedidoInput>
  }

  export type ProdutoUpdateWithoutItensPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutItensPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmpresaCreateWithoutProdutosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
    plano: PlanoCreateNestedOneWithoutEmpresasInput
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    boards?: BoardCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutProdutosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    planoAtualId: string
    criadaEm?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    boards?: BoardUncheckedCreateNestedManyWithoutEmpresaInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutEmpresaInput
    assinatura?: AssinaturaUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutProdutosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
  }

  export type PedidoItemCreateWithoutProdutoInput = {
    id?: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
    pedido: PedidoCreateNestedOneWithoutItensInput
  }

  export type PedidoItemUncheckedCreateWithoutProdutoInput = {
    id?: string
    pedidoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type PedidoItemCreateOrConnectWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput
    create: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
  }

  export type PedidoItemCreateManyProdutoInputEnvelope = {
    data: PedidoItemCreateManyProdutoInput | PedidoItemCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutProdutosInput = {
    update: XOR<EmpresaUpdateWithoutProdutosInput, EmpresaUncheckedUpdateWithoutProdutosInput>
    create: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutProdutosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutProdutosInput, EmpresaUncheckedUpdateWithoutProdutosInput>
  }

  export type EmpresaUpdateWithoutProdutosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    plano?: PlanoUpdateOneRequiredWithoutEmpresasNestedInput
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutProdutosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    planoAtualId?: StringFieldUpdateOperationsInput | string
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type PedidoItemUpsertWithWhereUniqueWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput
    update: XOR<PedidoItemUpdateWithoutProdutoInput, PedidoItemUncheckedUpdateWithoutProdutoInput>
    create: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
  }

  export type PedidoItemUpdateWithWhereUniqueWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput
    data: XOR<PedidoItemUpdateWithoutProdutoInput, PedidoItemUncheckedUpdateWithoutProdutoInput>
  }

  export type PedidoItemUpdateManyWithWhereWithoutProdutoInput = {
    where: PedidoItemScalarWhereInput
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutProdutoInput>
  }

  export type PedidoCreateWithoutPagamentoInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutPagamentoInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutPagamentoInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput>
  }

  export type PedidoCreateManyPagamentoInputEnvelope = {
    data: PedidoCreateManyPagamentoInput | PedidoCreateManyPagamentoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoUpsertWithWhereUniqueWithoutPagamentoInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutPagamentoInput, PedidoUncheckedUpdateWithoutPagamentoInput>
    create: XOR<PedidoCreateWithoutPagamentoInput, PedidoUncheckedCreateWithoutPagamentoInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutPagamentoInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutPagamentoInput, PedidoUncheckedUpdateWithoutPagamentoInput>
  }

  export type PedidoUpdateManyWithWhereWithoutPagamentoInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutPagamentoInput>
  }

  export type PedidoCreateWithoutFonteInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutFonteInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutFonteInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput>
  }

  export type PedidoCreateManyFonteInputEnvelope = {
    data: PedidoCreateManyFonteInput | PedidoCreateManyFonteInput[]
    skipDuplicates?: boolean
  }

  export type PedidoUpsertWithWhereUniqueWithoutFonteInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutFonteInput, PedidoUncheckedUpdateWithoutFonteInput>
    create: XOR<PedidoCreateWithoutFonteInput, PedidoUncheckedCreateWithoutFonteInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutFonteInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutFonteInput, PedidoUncheckedUpdateWithoutFonteInput>
  }

  export type PedidoUpdateManyWithWhereWithoutFonteInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutFonteInput>
  }

  export type PedidoCreateWithoutEnderecoInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
    logs?: LogMovimentacaoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutEnderecoInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    logs?: LogMovimentacaoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutEnderecoInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput>
  }

  export type PedidoCreateManyEnderecoInputEnvelope = {
    data: PedidoCreateManyEnderecoInput | PedidoCreateManyEnderecoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoUpsertWithWhereUniqueWithoutEnderecoInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutEnderecoInput, PedidoUncheckedUpdateWithoutEnderecoInput>
    create: XOR<PedidoCreateWithoutEnderecoInput, PedidoUncheckedCreateWithoutEnderecoInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutEnderecoInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutEnderecoInput, PedidoUncheckedUpdateWithoutEnderecoInput>
  }

  export type PedidoUpdateManyWithWhereWithoutEnderecoInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutEnderecoInput>
  }

  export type PedidoCreateWithoutLogsInput = {
    id?: string
    codigo: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    status: PedidoStatusCreateNestedOneWithoutPedidosInput
    empresa: EmpresaCreateNestedOneWithoutPedidosInput
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput
    pagamento: FormaPagamentoCreateNestedOneWithoutPedidosInput
    endereco?: EnderecoCreateNestedOneWithoutPedidosInput
    fonte: FontePedidoCreateNestedOneWithoutPedidosInput
  }

  export type PedidoUncheckedCreateWithoutLogsInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutLogsInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
  }

  export type PedidoStatusCreateWithoutLogsOrigemInput = {
    id?: string
    titulo: string
    ordem: number
    board: BoardCreateNestedOneWithoutListasInput
    pedidos?: PedidoCreateNestedManyWithoutStatusInput
    logsDestino?: LogMovimentacaoCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusUncheckedCreateWithoutLogsOrigemInput = {
    id?: string
    boardId: string
    titulo: string
    ordem: number
    pedidos?: PedidoUncheckedCreateNestedManyWithoutStatusInput
    logsDestino?: LogMovimentacaoUncheckedCreateNestedManyWithoutParaStatusInput
  }

  export type PedidoStatusCreateOrConnectWithoutLogsOrigemInput = {
    where: PedidoStatusWhereUniqueInput
    create: XOR<PedidoStatusCreateWithoutLogsOrigemInput, PedidoStatusUncheckedCreateWithoutLogsOrigemInput>
  }

  export type PedidoStatusCreateWithoutLogsDestinoInput = {
    id?: string
    titulo: string
    ordem: number
    board: BoardCreateNestedOneWithoutListasInput
    pedidos?: PedidoCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoCreateNestedManyWithoutDeStatusInput
  }

  export type PedidoStatusUncheckedCreateWithoutLogsDestinoInput = {
    id?: string
    boardId: string
    titulo: string
    ordem: number
    pedidos?: PedidoUncheckedCreateNestedManyWithoutStatusInput
    logsOrigem?: LogMovimentacaoUncheckedCreateNestedManyWithoutDeStatusInput
  }

  export type PedidoStatusCreateOrConnectWithoutLogsDestinoInput = {
    where: PedidoStatusWhereUniqueInput
    create: XOR<PedidoStatusCreateWithoutLogsDestinoInput, PedidoStatusUncheckedCreateWithoutLogsDestinoInput>
  }

  export type PedidoUpsertWithoutLogsInput = {
    update: XOR<PedidoUpdateWithoutLogsInput, PedidoUncheckedUpdateWithoutLogsInput>
    create: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutLogsInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutLogsInput, PedidoUncheckedUpdateWithoutLogsInput>
  }

  export type PedidoUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type PedidoUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoStatusUpsertWithoutLogsOrigemInput = {
    update: XOR<PedidoStatusUpdateWithoutLogsOrigemInput, PedidoStatusUncheckedUpdateWithoutLogsOrigemInput>
    create: XOR<PedidoStatusCreateWithoutLogsOrigemInput, PedidoStatusUncheckedCreateWithoutLogsOrigemInput>
    where?: PedidoStatusWhereInput
  }

  export type PedidoStatusUpdateToOneWithWhereWithoutLogsOrigemInput = {
    where?: PedidoStatusWhereInput
    data: XOR<PedidoStatusUpdateWithoutLogsOrigemInput, PedidoStatusUncheckedUpdateWithoutLogsOrigemInput>
  }

  export type PedidoStatusUpdateWithoutLogsOrigemInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    board?: BoardUpdateOneRequiredWithoutListasNestedInput
    pedidos?: PedidoUpdateManyWithoutStatusNestedInput
    logsDestino?: LogMovimentacaoUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateWithoutLogsOrigemInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoUncheckedUpdateManyWithoutStatusNestedInput
    logsDestino?: LogMovimentacaoUncheckedUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUpsertWithoutLogsDestinoInput = {
    update: XOR<PedidoStatusUpdateWithoutLogsDestinoInput, PedidoStatusUncheckedUpdateWithoutLogsDestinoInput>
    create: XOR<PedidoStatusCreateWithoutLogsDestinoInput, PedidoStatusUncheckedCreateWithoutLogsDestinoInput>
    where?: PedidoStatusWhereInput
  }

  export type PedidoStatusUpdateToOneWithWhereWithoutLogsDestinoInput = {
    where?: PedidoStatusWhereInput
    data: XOR<PedidoStatusUpdateWithoutLogsDestinoInput, PedidoStatusUncheckedUpdateWithoutLogsDestinoInput>
  }

  export type PedidoStatusUpdateWithoutLogsDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    board?: BoardUpdateOneRequiredWithoutListasNestedInput
    pedidos?: PedidoUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUpdateManyWithoutDeStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateWithoutLogsDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoUncheckedUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUncheckedUpdateManyWithoutDeStatusNestedInput
  }

  export type UsuarioCreateManyEmpresaInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    role?: $Enums.Role
  }

  export type BoardCreateManyEmpresaInput = {
    id?: string
    titulo: string
    createdAt?: Date | string
  }

  export type PedidoCreateManyEmpresaInput = {
    id?: string
    statusId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ProdutoCreateManyEmpresaInput = {
    id?: string
    nome: string
    descricao?: string | null
    precoBase: number
    ativo?: boolean
  }

  export type UsuarioUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UsuarioUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UsuarioUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type BoardUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listas?: PedidoStatusUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listas?: PedidoStatusUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProdutoUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    itensPedido?: PedidoItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    itensPedido?: PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    precoBase?: FloatFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmpresaCreateManyPlanoInput = {
    id?: string
    nome: string
    cnpj?: string | null
    email?: string | null
    telefone?: string | null
    criadaEm?: Date | string
  }

  export type AssinaturaCreateManyPlanoInput = {
    id?: string
    empresaId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    periodoFim?: Date | string | null
  }

  export type EmpresaUpdateWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    boards?: BoardUncheckedUpdateManyWithoutEmpresaNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutEmpresaNestedInput
    assinatura?: AssinaturaUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateManyWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssinaturaUpdateWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    empresa?: EmpresaUpdateOneRequiredWithoutAssinaturaNestedInput
  }

  export type AssinaturaUncheckedUpdateWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssinaturaUncheckedUpdateManyWithoutPlanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    periodoFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PedidoStatusCreateManyBoardInput = {
    id?: string
    titulo: string
    ordem: number
  }

  export type PedidoStatusUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoUncheckedUpdateManyWithoutStatusNestedInput
    logsOrigem?: LogMovimentacaoUncheckedUpdateManyWithoutDeStatusNestedInput
    logsDestino?: LogMovimentacaoUncheckedUpdateManyWithoutParaStatusNestedInput
  }

  export type PedidoStatusUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    ordem?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoCreateManyStatusInput = {
    id?: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type LogMovimentacaoCreateManyDeStatusInput = {
    id?: string
    pedidoId: string
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type LogMovimentacaoCreateManyParaStatusInput = {
    id?: string
    pedidoId: string
    deStatusId?: string | null
    dataMovimentacao?: Date | string
  }

  export type PedidoUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LogMovimentacaoUpdateWithoutDeStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutLogsNestedInput
    paraStatus?: PedidoStatusUpdateOneRequiredWithoutLogsDestinoNestedInput
  }

  export type LogMovimentacaoUncheckedUpdateWithoutDeStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutDeStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoUpdateWithoutParaStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutLogsNestedInput
    deStatus?: PedidoStatusUpdateOneWithoutLogsOrigemNestedInput
  }

  export type LogMovimentacaoUncheckedUpdateWithoutParaStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutParaStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateManyPedidoInput = {
    id?: string
    produtoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type LogMovimentacaoCreateManyPedidoInput = {
    id?: string
    deStatusId?: string | null
    paraStatusId: string
    dataMovimentacao?: Date | string
  }

  export type PedidoItemUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    produto?: ProdutoUpdateOneRequiredWithoutItensPedidoNestedInput
  }

  export type PedidoItemUncheckedUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    produtoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    produtoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogMovimentacaoUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    deStatus?: PedidoStatusUpdateOneWithoutLogsOrigemNestedInput
    paraStatus?: PedidoStatusUpdateOneRequiredWithoutLogsDestinoNestedInput
  }

  export type LogMovimentacaoUncheckedUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogMovimentacaoUncheckedUpdateManyWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    deStatusId?: NullableStringFieldUpdateOperationsInput | string | null
    paraStatusId?: StringFieldUpdateOperationsInput | string
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateManyProdutoInput = {
    id?: string
    pedidoId: string
    quantidade: number
    precoUnitario: number
    observacao?: string | null
  }

  export type PedidoItemUpdateWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    pedido?: PedidoUpdateOneRequiredWithoutItensNestedInput
  }

  export type PedidoItemUncheckedUpdateWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PedidoItemUncheckedUpdateManyWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoUnitario?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PedidoCreateManyPagamentoInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type PedidoUpdateWithoutPagamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutPagamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutPagamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PedidoCreateManyFonteInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    pagamentoId: string
    enderecoId?: string | null
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type PedidoUpdateWithoutFonteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    endereco?: EnderecoUpdateOneWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutFonteInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutFonteInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    enderecoId?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PedidoCreateManyEnderecoInput = {
    id?: string
    statusId: string
    empresaId: string
    codigo: string
    fonteId: string
    pagamentoId: string
    desconto?: number
    taxaEntrega?: number
    valorTotal: number
    observacao?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type PedidoUpdateWithoutEnderecoInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: PedidoStatusUpdateOneRequiredWithoutPedidosNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutPedidosNestedInput
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pagamento?: FormaPagamentoUpdateOneRequiredWithoutPedidosNestedInput
    fonte?: FontePedidoUpdateOneRequiredWithoutPedidosNestedInput
    logs?: LogMovimentacaoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutEnderecoInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    logs?: LogMovimentacaoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutEnderecoInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    fonteId?: StringFieldUpdateOperationsInput | string
    pagamentoId?: StringFieldUpdateOperationsInput | string
    desconto?: FloatFieldUpdateOperationsInput | number
    taxaEntrega?: FloatFieldUpdateOperationsInput | number
    valorTotal?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
/** THIS IS A GENERATED FILE. DO NOT EDIT MANUALLY! **/
/** GENERATED FROM http://localhost:4000/graphql **/
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Details the Phone properties */
export type ApiPhone = {
  /** The id corresponding to the product */
  id?: Maybe<Scalars['String']>;
  /** The stock keeping unit identifier to differentiate between similar products based on their different attribute values */
  sku?: Maybe<Scalars['String']>;
  /** Phone brand */
  brand?: Maybe<Scalars['String']>;
  /** The aggregated rating of the sku */
  ratingValue?: Maybe<Scalars['Float']>;
  /** The number of ratings */
  reviewCount?: Maybe<Scalars['Int']>;
  /** The price of the sku */
  price?: Maybe<Scalars['Float']>;
  /** Stock availability of the sku */
  availability?: Maybe<Scalars['Int']>;
  /** The product page url for the sku */
  url?: Maybe<Scalars['String']>;
  /** Product description */
  description?: Maybe<Scalars['String']>;
  /** Image url */
  image?: Maybe<Scalars['String']>;
  /** Product name */
  name?: Maybe<Scalars['String']>;
  /** Phone only prop */
  phoneProp?: Maybe<Scalars['String']>;
};

export type ApiProduct = ApiPhone | ApiTablet;

/** The object that defines all the queries */
export type ApiQuery = {
  /** Returns information about the server */
  info?: Maybe<Scalars['String']>;
  /** Returns all phones */
  phones?: Maybe<Array<Maybe<ApiPhone>>>;
  /** Returns the phone whose id matches the provided one or undefined if none is found */
  getPhoneById?: Maybe<ApiPhone>;
  /** Returns all tablets */
  tablets?: Maybe<Array<Maybe<ApiTablet>>>;
  /** Returns the Tablet whose id matches the provided one or undefined if none is found */
  getTabletById?: Maybe<ApiTablet>;
  /** Returns all products */
  products?: Maybe<Array<Maybe<ApiProduct>>>;
  /** Returns products that include the input name in their name */
  getProductByName?: Maybe<Array<Maybe<ApiProduct>>>;
  /** Returns product with matching id */
  getProductByID?: Maybe<ApiProduct>;
};


/** The object that defines all the queries */
export type ApiQueryGetPhoneByIdArgs = {
  id: Scalars['String'];
};


/** The object that defines all the queries */
export type ApiQueryGetTabletByIdArgs = {
  id: Scalars['String'];
};


/** The object that defines all the queries */
export type ApiQueryGetProductByNameArgs = {
  name: Scalars['String'];
};


/** The object that defines all the queries */
export type ApiQueryGetProductByIdArgs = {
  id: Scalars['String'];
};

/** Details the Tablet properties */
export type ApiTablet = {
  /** The id corresponding to the product */
  id?: Maybe<Scalars['String']>;
  /** The stock keeping unit identifier to differentiate between similar products based on their different attribute values */
  sku?: Maybe<Scalars['String']>;
  /** Tablet brand */
  brand?: Maybe<Scalars['String']>;
  /** The aggregated rating of the sku */
  ratingValue?: Maybe<Scalars['Float']>;
  /** The number of ratings */
  reviewCount?: Maybe<Scalars['Int']>;
  /** The price of the sku */
  price?: Maybe<Scalars['Float']>;
  /** Stock availability of the sku */
  availability?: Maybe<Scalars['Int']>;
  /** The product page url for the sku */
  url?: Maybe<Scalars['String']>;
  /** Product description */
  description?: Maybe<Scalars['String']>;
  /** Image url */
  image?: Maybe<Scalars['String']>;
  /** Product name */
  name?: Maybe<Scalars['String']>;
  /** Tablet only prop */
  tabletProp?: Maybe<Scalars['String']>;
};

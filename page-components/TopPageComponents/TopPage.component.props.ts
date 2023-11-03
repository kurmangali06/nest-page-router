import { TopLevelCategory, TopPageModel } from "../../interface/page.interface";
import { ProductModel } from "../../interface/product.interface";

export interface TopPageComponentProps extends Record<string, unknown> {
	page: TopPageModel;
	firstCategory: TopLevelCategory;
    products: ProductModel[];
}
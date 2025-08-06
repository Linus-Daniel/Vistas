"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  X,
  Upload,
  Save,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Specification {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description?: string;
  image?: string;
  specifications?: Specification[];
}

interface ProductForm {
  name: string;
  category: string;
  price: number | "";
  originalPrice: number | "";
  description: string;
  sku: string;
  inStock: boolean;
  image: string;
  specifications: Specification[];
}

const categories = [
  "Microcontrollers",
  "Integrated Circuits (ICs)",
  "Sensors",
  "Resistors",
  "Capacitors",
  "Transistors",
  "Development Boards",
  "Power Modules",
  "Connectors",
  "LEDs",
  "Displays",
  "Motors",
  "Other Components",
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Arduino Uno R3",
      category: "Microcontrollers",
      price: 24.99,
      stock: 45,
      sku: "ARD-UNO-R3",
    },
    {
      id: 2,
      name: "ESP32 DevKit",
      category: "Microcontrollers",
      price: 12.99,
      stock: 120,
      sku: "ESP32-DEV",
    },
    {
      id: 3,
      name: "ATmega328P IC",
      category: "Integrated Circuits (ICs)",
      price: 3.49,
      stock: 78,
      sku: "ATMEGA-328P",
    },
    {
      id: 4,
      name: "DHT22 Temperature Sensor",
      category: "Sensors",
      price: 8.99,
      stock: 56,
      sku: "DHT22-TEMP",
    },
    {
      id: 5,
      name: "10kΩ Resistor Pack",
      category: "Resistors",
      price: 2.99,
      stock: 230,
      sku: "RES-10K-PACK",
    },
  ]);

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    sku: "",
    inStock: true,
    image: "",
    specifications: [{ label: "", value: "" }],
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSpecificationChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    if (formData.specifications.length > 1) {
      setFormData((prev) => ({
        ...prev,
        specifications: prev.specifications.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";

    const validSpecs = formData.specifications.filter(
      (spec) => spec.label.trim() && spec.value.trim()
    );
    if (validSpecs.length !== formData.specifications.length) {
      newErrors.specifications =
        "All specification fields must be filled or removed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const validSpecs = formData.specifications.filter(
        (spec) => spec.label.trim() && spec.value.trim()
      );

      const newProduct: Product = {
        id: products.length + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: formData.inStock ? 100 : 0, // Default stock
        sku: formData.sku,
        description: formData.description,
        image: formData.image,
        specifications: validSpecs.length > 0 ? validSpecs : undefined,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProducts((prev) => [...prev, newProduct]);

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        originalPrice: "",
        description: "",
        sku: "",
        inStock: true,
        image: "",
        specifications: [{ label: "", value: "" }],
      });

      setIsModalOpen(false);
      setPreviewMode(false);
      alert("Product created successfully!");
    } catch (error) {
      alert("Error creating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock > 50)
      return {
        color: "bg-green-100 text-green-800",
        text: `${stock} in stock`,
      };
    if (stock > 10)
      return {
        color: "bg-yellow-100 text-yellow-800",
        text: `${stock} in stock`,
      };
    if (stock > 0)
      return {
        color: "bg-orange-100 text-orange-800",
        text: `${stock} low stock`,
      };
    return { color: "bg-red-100 text-red-800", text: "Out of stock" };
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Package className="mr-2 text-blue-500" /> Products
        </h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mt-4 md:mt-0 transition-colors">
              <Plus className="mr-2 w-4 h-4" /> Add Product
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold">
                  Create New Product
                </DialogTitle>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Edit" : "Preview"}
                </button>
              </div>
            </DialogHeader>

            {previewMode ? (
              /* Preview Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt={formData.name}
                        className="w-full aspect-square object-contain bg-gray-100 rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image uploaded</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        {formData.category || "No category"}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        {formData.name || "Product Name"}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ${formData.price || "0.00"}
                      </span>
                      {formData.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${formData.originalPrice}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700">
                      {formData.description || "No description provided"}
                    </p>
                    <p className="text-sm text-gray-600">
                      SKU: {formData.sku || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Form Mode */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="e.g. Arduino Uno R3 Microcontroller Board"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.category ? "border-red-300" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU *
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) =>
                          handleInputChange("sku", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.sku ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="e.g. ARD-UNO-R3"
                      />
                      {errors.sku && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.sku}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price * ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange(
                            "price",
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.price ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="24.99"
                      />
                      {errors.price && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          handleInputChange(
                            "originalPrice",
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="29.99 (optional)"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.description
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="Detailed product description..."
                      />
                      {errors.description && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Image</h3>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    {formData.image ? (
                      <div className="space-y-2">
                        <img
                          src={formData.image}
                          alt="Product preview"
                          className="max-h-32 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleInputChange("image", "")}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="text-blue-600 hover:text-blue-800">
                            Upload an image
                          </span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          PNG, JPG, WebP up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <button
                      type="button"
                      onClick={addSpecification}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.specifications.map((spec, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) =>
                            handleSpecificationChange(
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          placeholder="Label"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) =>
                            handleSpecificationChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          placeholder="Value"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {formData.specifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpecification(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {errors.specifications && (
                      <p className="text-red-600 text-sm">
                        {errors.specifications}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isSubmitting ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Filters */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sort by</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low-High)</option>
                <option value="price-desc">Price (High-Low)</option>
                <option value="stock-asc">Stock (Low-High)</option>
                <option value="stock-desc">Stock (High-Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-md flex items-center justify-center text-blue-500">
                        <Package className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    ${product.price}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}
                    >
                      {stockStatus.text}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-6 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{sortedProducts.length}</span> of{" "}
            <span className="font-medium">{sortedProducts.length}</span> results
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

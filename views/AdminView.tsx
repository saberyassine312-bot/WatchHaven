
import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Upload, ListPlus, MinusCircle, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Product, Category } from '../types';

interface AdminViewProps {
  products: Product[];
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ products, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newSpec, setNewSpec] = useState('');

  const initialFormState: Partial<Product> = {
    name: '',
    brand: '',
    price: 0,
    category: 'Men',
    description: '',
    images: [''],
    specs: [],
    rating: 5,
    reviewsCount: 0,
    isNew: false,
    isBestSeller: false,
    discount: 0,
    marketingLink: ''
  };

  const [formData, setFormData] = useState<Partial<Product>>(initialFormState);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        specs: product.specs || [],
        discount: product.discount || 0,
        marketingLink: product.marketingLink || ''
      });
    } else {
      setEditingProduct(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          images: [reader.result as string]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpec = () => {
    if (newSpec.trim()) {
      setFormData({
        ...formData,
        specs: [...(formData.specs || []), newSpec.trim()]
      });
      setNewSpec('');
    }
  };

  const removeSpec = (index: number) => {
    setFormData({
      ...formData,
      specs: (formData.specs || []).filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProduct = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      price: Number(formData.price) || 0,
      discount: Number(formData.discount) || 0,
      rating: formData.rating || 5,
      reviewsCount: formData.reviewsCount || 0,
    } as Product;

    if (editingProduct) {
      onUpdate(finalProduct);
    } else {
      onAdd(finalProduct);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400 text-sm tracking-wide">Control your premium timepiece catalog.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-gold text-navy px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-all shadow-lg"
          >
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Product</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Marketing</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.images[0] || 'https://via.placeholder.com/150'} className="w-12 h-12 object-cover rounded bg-gray-100 border border-gray-200" alt="" />
                      <div>
                        <p className="font-bold text-navy">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold uppercase tracking-tighter bg-navy/5 text-navy px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-navy">
                    ${p.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {p.marketingLink ? (
                      <a href={p.marketingLink} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-navy transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-300">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleOpenModal(p)}
                        className="p-2 text-navy hover:text-gold transition-colors bg-navy/5 rounded-full"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(p.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors bg-red-50 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="bg-navy p-6 flex justify-between items-center text-white flex-shrink-0">
              <h2 className="text-xl font-serif">{editingProduct ? 'Edit Timepiece' : 'Add New Timepiece'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-gold transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Model Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Brand</label>
                  <input 
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price ($)</label>
                  <input 
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Discount (%)</label>
                  <input 
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                    className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all"
                  >
                    <option value="Men">Men's</option>
                    <option value="Women">Women's</option>
                    <option value="Smart">Smartwatch</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Marketing / External Link (Social Media)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="url"
                    value={formData.marketingLink}
                    onChange={(e) => setFormData({...formData, marketingLink: e.target.value})}
                    className="w-full border border-gray-200 pl-10 pr-3 py-3 rounded focus:border-gold outline-none transition-all"
                    placeholder="https://instagram.com/p/... or affiliate link"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-200 p-3 rounded focus:border-gold outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Specifications</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    value={newSpec}
                    onChange={(e) => setNewSpec(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpec())}
                    className="flex-grow border border-gray-200 p-2 rounded text-sm outline-none focus:border-gold"
                    placeholder="Add a spec"
                  />
                  <button type="button" onClick={addSpec} className="bg-navy text-white px-4 py-2 rounded hover:bg-gold transition-colors">
                    <ListPlus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specs?.map((spec, index) => (
                    <span key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-navy">
                      {spec}
                      <button type="button" onClick={() => removeSpec(index)} className="text-red-400 hover:text-red-600">
                        <MinusCircle size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Image</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gray-50 transition-all group aspect-video relative overflow-hidden"
                  >
                    {formData.images?.[0] ? (
                      <>
                        <img src={formData.images[0]} className="absolute inset-0 w-full h-full object-cover z-0" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity z-10">
                          <Upload size={24} className="mb-2" />
                          <span className="text-[10px] font-bold uppercase">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload size={32} className="text-gray-300 mb-2 mx-auto" />
                        <p className="text-xs text-gray-400 font-medium">Click to upload</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold uppercase tracking-widest text-xs text-gray-400">Cancel</button>
                <button type="submit" className="bg-navy text-white px-8 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gold transition-all shadow-md">
                  <Save size={16} /> {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;

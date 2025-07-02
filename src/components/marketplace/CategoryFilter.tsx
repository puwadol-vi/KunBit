'use client';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: '🌐' },
  { id: 'watches', name: 'Watches', icon: '⌚' },
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition-colors ${selectedCategory === cat.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
} 
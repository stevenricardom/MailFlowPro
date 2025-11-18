import React, { useState } from 'react';
import { Plus, Edit, Trash2, Sun, Moon, Globe, User, ArrowLeft, LogOut, Mail, FileText, Tag, Check } from 'lucide-react';

interface Filter {
  id: number;
  name: string;
  description: string;
  type: 'email' | 'keyword' | 'subject';
  criteria: string;
  active: boolean;
  autoReply: boolean;
  caseSensitive?: boolean;
}

interface MailFlowProProps {
  userEmail: string;
  onLogout: () => void;
}

export function MailFlowPro({ userEmail, onLogout }: MailFlowProProps) {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFilterId, setDeleteFilterId] = useState<number | null>(null);
  const [editingFilter, setEditingFilter] = useState<Filter | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Sample filters data
  const [filters, setFilters] = useState<Filter[]>([
    {
      id: 1,
      name: 'Promociones',
      description: 'Filtrar correos promocionales y ofertas',
      type: 'keyword',
      criteria: 'promoción, oferta, descuento',
      active: true,
      autoReply: false
    },
    {
      id: 2,
      name: 'Trabajo importante',
      description: 'Correos de jefe y gerencia',
      type: 'email',
      criteria: 'jefe@empresa.com, gerencia@empresa.com',
      active: true,
      autoReply: true
    },
    {
      id: 3,
      name: 'Newsletter',
      description: 'Boletines informativos',
      type: 'subject',
      criteria: 'newsletter, boletín',
      active: false,
      autoReply: false
    }
  ]);

  const [newFilter, setNewFilter] = useState<Omit<Filter, 'id'>>({
    name: '',
    description: '',
    type: 'email',
    criteria: '',
    active: true,
    autoReply: false,
    caseSensitive: false
  });

  const deleteFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
    setShowDeleteModal(false);
    setDeleteFilterId(null);
  };

  const addFilter = () => {
    const filter: Filter = {
      ...newFilter,
      id: Date.now()
    };
    setFilters([...filters, filter]);
    setNewFilter({
      name: '',
      description: '',
      type: 'email',
      criteria: '',
      active: true,
      autoReply: false,
      caseSensitive: false
    });
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setCurrentView('home');
    }, 1500);
  };

  const updateFilter = () => {
    if (!editingFilter) return;
    setFilters(filters.map(f => f.id === editingFilter.id ? editingFilter : f));
    setEditingFilter(null);
    setCurrentView('home');
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const buttonPrimary = 'bg-blue-500 hover:bg-blue-600 text-white';
  const buttonSecondary = darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200`}>
      {/* Header */}
      <div className={`${cardClasses} border-b px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center space-x-3">
          {currentView !== 'home' && (
            <button
              onClick={() => {
                setCurrentView('home');
                setEditingFilter(null);
              }}
              className={`${buttonSecondary} p-2 rounded-lg`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-blue-600">MailFlow Pro</h1>
            <p className="text-sm text-gray-500">Automatización de correos electrónicos</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className={`${buttonSecondary} p-2 rounded-lg`}
            title="Cambiar idioma"
          >
            <Globe className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${buttonSecondary} p-2 rounded-lg`}
            title="Modo oscuro/claro"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className={`${cardClasses} border px-3 py-2 rounded-lg flex items-center space-x-2`}>
            <User className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{userEmail}</span>
          </div>

          <button
            onClick={onLogout}
            className={`${buttonSecondary} p-2 rounded-lg`}
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Home View */}
      {currentView === 'home' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2>Filtros Activos</h2>
            <button
              onClick={() => setCurrentView('create')}
              className={`${buttonPrimary} px-4 py-2 rounded-lg flex items-center space-x-2`}
            >
              <Plus className="w-5 h-5" />
              <span>Añadir Filtro</span>
            </button>
          </div>

          <div className="grid gap-4">
            {filters.map((filter) => (
              <div key={filter.id} className={`${cardClasses} border rounded-lg p-4`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3>{filter.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        filter.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {filter.active ? 'Activo' : 'Inactivo'}
                      </span>
                      {filter.autoReply && (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Respuesta automática
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{filter.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        {filter.type === 'email' && <Mail className="w-4 h-4" />}
                        {filter.type === 'keyword' && <Tag className="w-4 h-4" />}
                        {filter.type === 'subject' && <FileText className="w-4 h-4" />}
                        <span className="capitalize">{filter.type === 'email' ? 'Dirección' : filter.type === 'keyword' ? 'Palabra clave' : 'Asunto'}</span>
                      </span>
                      <span className="text-blue-600">{filter.criteria}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingFilter({...filter});
                        setCurrentView('edit');
                      }}
                      className={`${buttonSecondary} p-2 rounded-lg`}
                      title="Editar filtro"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteFilterId(filter.id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      title="Eliminar filtro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filters.length === 0 && (
            <div className={`${cardClasses} border rounded-lg p-8 text-center`}>
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No hay filtros configurados</p>
              <button
                onClick={() => setCurrentView('create')}
                className={`${buttonPrimary} px-4 py-2 rounded-lg`}
              >
                Crear primer filtro
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create Filter View */}
      {currentView === 'create' && (
        <div className="p-6">
          <h2>Crear Nuevo Filtro</h2>
          
          <div className={`${cardClasses} border rounded-lg p-6 mt-6`}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Nombre del filtro</label>
                <input
                  type="text"
                  value={newFilter.name}
                  onChange={(e) => setNewFilter({...newFilter, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Ej: Correos de trabajo"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Descripción</label>
                <textarea
                  value={newFilter.description}
                  onChange={(e) => setNewFilter({...newFilter, description: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  rows={3}
                  placeholder="Describe qué hace este filtro..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Tipo de filtrado</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="filterType"
                      value="email"
                      checked={newFilter.type === 'email'}
                      onChange={(e) => setNewFilter({...newFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por dirección de correo electrónico específica</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="filterType"
                      value="keyword"
                      checked={newFilter.type === 'keyword'}
                      onChange={(e) => setNewFilter({...newFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <Tag className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por palabra clave</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="filterType"
                      value="subject"
                      checked={newFilter.type === 'subject'}
                      onChange={(e) => setNewFilter({...newFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por asunto/cuerpo</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  {newFilter.type === 'email' ? 'Dirección de correo electrónico' : 
                   newFilter.type === 'keyword' ? 'Palabras clave (separadas por comas)' :
                   'Texto en asunto/cuerpo'}
                </label>
                <input
                  type="text"
                  value={newFilter.criteria}
                  onChange={(e) => setNewFilter({...newFilter, criteria: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder={
                    newFilter.type === 'email' ? 'ejemplo@dominio.com' :
                    newFilter.type === 'keyword' ? 'promoción, oferta, descuento' :
                    'Texto a buscar...'
                  }
                />
              </div>

              {newFilter.type !== 'email' && (
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="caseSensitive"
                    checked={newFilter.caseSensitive}
                    onChange={(e) => setNewFilter({...newFilter, caseSensitive: e.target.checked})}
                    className="text-blue-500 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="caseSensitive" className="text-sm">
                    Sensible a mayúsculas y minúsculas
                  </label>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoReply"
                  checked={newFilter.autoReply}
                  onChange={(e) => setNewFilter({...newFilter, autoReply: e.target.checked})}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                />
                <label htmlFor="autoReply" className="text-sm">
                  Activar respuesta automática
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={newFilter.active}
                  onChange={(e) => setNewFilter({...newFilter, active: e.target.checked})}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                />
                <label htmlFor="active" className="text-sm">
                  Filtro activo
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setCurrentView('review-create')}
                disabled={!newFilter.name || !newFilter.criteria}
                className={`${buttonPrimary} px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Revisar filtro
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className={`${buttonSecondary} px-6 py-2 rounded-lg`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Filter View */}
      {currentView === 'edit' && editingFilter && (
        <div className="p-6">
          <h2>Editar Filtro</h2>
          
          <div className={`${cardClasses} border rounded-lg p-6 mt-6`}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Nombre del filtro</label>
                <input
                  type="text"
                  value={editingFilter.name}
                  onChange={(e) => setEditingFilter({...editingFilter, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Descripción</label>
                <textarea
                  value={editingFilter.description}
                  onChange={(e) => setEditingFilter({...editingFilter, description: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Tipo de filtrado</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="editFilterType"
                      value="email"
                      checked={editingFilter.type === 'email'}
                      onChange={(e) => setEditingFilter({...editingFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por dirección de correo electrónico</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="editFilterType"
                      value="keyword"
                      checked={editingFilter.type === 'keyword'}
                      onChange={(e) => setEditingFilter({...editingFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <Tag className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por palabra clave</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="editFilterType"
                      value="subject"
                      checked={editingFilter.type === 'subject'}
                      onChange={(e) => setEditingFilter({...editingFilter, type: e.target.value as Filter['type']})}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>Filtrar por asunto/cuerpo</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Criterios</label>
                <input
                  type="text"
                  value={editingFilter.criteria}
                  onChange={(e) => setEditingFilter({...editingFilter, criteria: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              {editingFilter.type !== 'email' && (
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="editCaseSensitive"
                    checked={editingFilter.caseSensitive || false}
                    onChange={(e) => setEditingFilter({...editingFilter, caseSensitive: e.target.checked})}
                    className="text-blue-500 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="editCaseSensitive" className="text-sm">
                    Sensible a mayúsculas y minúsculas
                  </label>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="editAutoReply"
                  checked={editingFilter.autoReply}
                  onChange={(e) => setEditingFilter({...editingFilter, autoReply: e.target.checked})}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                />
                <label htmlFor="editAutoReply" className="text-sm">
                  Activar respuesta automática
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="editActive"
                  checked={editingFilter.active}
                  onChange={(e) => setEditingFilter({...editingFilter, active: e.target.checked})}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                />
                <label htmlFor="editActive" className="text-sm">
                  Filtro activo
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setCurrentView('review-edit')}
                className={`${buttonPrimary} px-6 py-2 rounded-lg`}
              >
                Revisar cambios
              </button>
              <button
                onClick={() => {
                  setCurrentView('home');
                  setEditingFilter(null);
                }}
                className={`${buttonSecondary} px-6 py-2 rounded-lg`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Create View */}
      {currentView === 'review-create' && (
        <div className="p-6">
          <h2>Revisar Nuevo Filtro</h2>
          
          <div className={`${cardClasses} border rounded-lg p-6 mt-6`}>
            <div className="space-y-4">
              <div>
                <span>Nombre:</span>
                <span className="ml-2">{newFilter.name}</span>
              </div>
              <div>
                <span>Descripción:</span>
                <span className="ml-2">{newFilter.description}</span>
              </div>
              <div>
                <span>Tipo:</span>
                <span className="ml-2 capitalize">
                  {newFilter.type === 'email' ? 'Dirección de correo' :
                   newFilter.type === 'keyword' ? 'Palabra clave' :
                   'Asunto/Cuerpo'}
                </span>
              </div>
              <div>
                <span>Criterios:</span>
                <span className="ml-2 text-blue-600">{newFilter.criteria}</span>
              </div>
              {newFilter.type !== 'email' && (
                <div>
                  <span>Sensible a mayúsculas:</span>
                  <span className="ml-2">{newFilter.caseSensitive ? 'Sí' : 'No'}</span>
                </div>
              )}
              <div>
                <span>Respuesta automática:</span>
                <span className="ml-2">{newFilter.autoReply ? 'Sí' : 'No'}</span>
              </div>
              <div>
                <span>Estado:</span>
                <span className="ml-2">{newFilter.active ? 'Activo' : 'Inactivo'}</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={addFilter}
                className={`${buttonPrimary} px-6 py-2 rounded-lg`}
              >
                Crear filtro
              </button>
              <button
                onClick={() => setCurrentView('create')}
                className={`${buttonSecondary} px-6 py-2 rounded-lg`}
              >
                Volver a editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Edit View */}
      {currentView === 'review-edit' && editingFilter && (
        <div className="p-6">
          <h2>Revisar Cambios del Filtro</h2>
          
          <div className={`${cardClasses} border rounded-lg p-6 mt-6`}>
            <div className="space-y-4">
              <div>
                <span>Nombre:</span>
                <span className="ml-2">{editingFilter.name}</span>
              </div>
              <div>
                <span>Descripción:</span>
                <span className="ml-2">{editingFilter.description}</span>
              </div>
              <div>
                <span>Tipo:</span>
                <span className="ml-2 capitalize">
                  {editingFilter.type === 'email' ? 'Dirección de correo' :
                   editingFilter.type === 'keyword' ? 'Palabra clave' :
                   'Asunto/Cuerpo'}
                </span>
              </div>
              <div>
                <span>Criterios:</span>
                <span className="ml-2 text-blue-600">{editingFilter.criteria}</span>
              </div>
              {editingFilter.type !== 'email' && (
                <div>
                  <span>Sensible a mayúsculas:</span>
                  <span className="ml-2">{editingFilter.caseSensitive ? 'Sí' : 'No'}</span>
                </div>
              )}
              <div>
                <span>Respuesta automática:</span>
                <span className="ml-2">{editingFilter.autoReply ? 'Sí' : 'No'}</span>
              </div>
              <div>
                <span>Estado:</span>
                <span className="ml-2">{editingFilter.active ? 'Activo' : 'Inactivo'}</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={updateFilter}
                className={`${buttonPrimary} px-6 py-2 rounded-lg`}
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setCurrentView('edit')}
                className={`${buttonSecondary} px-6 py-2 rounded-lg`}
              >
                Volver a editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardClasses} border rounded-lg p-6 max-w-md w-full mx-4`}>
            <h3>Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6 mt-4">
              ¿Estás seguro de que deseas eliminar el filtro "<strong>{filters.find(f => f.id === deleteFilterId)?.name}</strong>"? 
              Esta acción no se puede deshacer.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => deleteFilterId && deleteFilter(deleteFilterId)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteFilterId(null);
                }}
                className={`${buttonSecondary} px-4 py-2 rounded-lg`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation Modal */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardClasses} border rounded-lg p-8 animate-scale-in`}>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in mb-4">
                <Check className="w-12 h-12 text-white animate-check-draw" />
              </div>
              <h3 className="text-green-600">¡Filtro creado exitosamente!</h3>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes check-draw {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-check-draw {
          animation: check-draw 0.5s ease-in-out 0.2s forwards;
        }
      `}</style>
    </div>
  );
}

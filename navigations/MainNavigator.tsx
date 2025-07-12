// navigations/ProductNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas de productos
import CrearProductoScreen from '../screens/Productos/CrearProductoScreen';
import LeerProductosScreen from '../screens/Productos/LeerProductosScreen';
import EditarProductoScreen from '../screens/Productos/EditarProductoScreen';
import EliminarProductoScreen from '../screens/Productos/EliminarProductoScreen';

// Define los tipos para el Stack Navigator de Productos
export type ProductStackParamList = {
  CrearProducto: undefined;
  LeerProductos: undefined;
  // ¡CAMBIO CLAVE AQUÍ! Ahora EditarProducto espera un objeto con 'productId' de tipo string
  EditarProducto: { productId: string };
  EliminarProducto: undefined;
};

const ProductStack = createStackNavigator<ProductStackParamList>();

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator initialRouteName="CrearProducto">
      <ProductStack.Screen
        name="CrearProducto"
        component={CrearProductoScreen}
        options={{ title: 'Registrar Nuevo Producto' }}
      />
      <ProductStack.Screen
        name="LeerProductos"
        component={LeerProductosScreen}
        options={{ title: 'Lista de Productos' }}
      />
      <ProductStack.Screen
        name="EditarProducto"
        component={EditarProductoScreen}
        options={{ title: 'Editar Producto' }}
      />
      <ProductStack.Screen
        name="EliminarProducto"
        component={EliminarProductoScreen}
        options={{ title: 'Eliminar Producto' }}
      />
    </ProductStack.Navigator>
  );
};

export default ProductNavigator;

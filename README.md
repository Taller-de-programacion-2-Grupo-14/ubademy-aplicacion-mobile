# App Mobile

## Instalación
En el directorio root donde se descargó el proyecto
1. npm install
2. expo start

Se requiere tener la última versión de expo installada

## Troubleshooting

Para arreglar el error de native base:
Agregar el parámetro "ref" a dos archivos:
- \node_modules\native-base\src\components\primitives\Hidden: (linea 6)
   ``` 
   const SkeletonCircle = ({ children, ...props }: ISkeletonProps, ref) => {
    const resolvedProps = usePropsResolution('SkeletonCircle', props);
    // Skeleton component with border Radius 999
    return resolvedProps.isLoaded ? children : <Skeleton {...resolvedProps} />;
  };
  ```
- \node_modules\native-base\src\components\composites\Skeleton: linea 8
  ```
  export function Hidden({ children, ...props }: IHiddenProps, ref) {
  const { from, till, only, platform, colorMode } = usePropsResolution(
    'Hidden',
    props,
    {
      ignoreProps: ['only', 'platform'],
    }
  );
  ```
Error "Setting a timer for a long period of time, i.e. multiple minutes, ..."
1. Navegar hasta el archivo node_modules/react-native/Libraries/Core/Timers/JSTimers.js .

2. Buscar la variable MAX_TIMER_DURATION_MS

3. Cambiar el valor por 10000 * 1000

4. Guardar

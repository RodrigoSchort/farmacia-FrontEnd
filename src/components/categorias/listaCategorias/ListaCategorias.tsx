import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';
import Categorias from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import CardCategorias from '../cardCategorias/CardCategorias';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categorias[]>([]);

  let navigate = useNavigate();

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias);
    } catch (error: any) {
      console.error('Erro ao buscar categorias:', error);
      if (error.toString().includes('403')) {

      }
    }
  }

  return (
    <>
      {categorias.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <>
                <CardCategorias key={categoria.id} categoria={categoria} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;
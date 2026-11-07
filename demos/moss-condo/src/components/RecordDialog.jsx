// Importa os recursos que guardam valores e controlam o diálogo nativo do navegador.
import React, { useEffect, useRef, useState } from 'react';
// Constrói um formulário acessível a partir dos campos definidos para cada módulo.
export default function RecordDialog({ title, fields, initial, onSave, onClose }) {
  const dialog = useRef(null); // Guarda a referência ao elemento de diálogo.
  const [values, setValues] = useState(initial); // Guarda os valores que a pessoa está editando.
  const [error, setError] = useState(''); // Guarda a mensagem de validação do formulário.
  useEffect(() => { dialog.current.showModal(); }, []); // Abre o diálogo com foco contido pelo navegador.
  function submit(event) { // Executa a tentativa de salvar o formulário.
    event.preventDefault(); // Evita que o navegador recarregue a página.
    const message = onSave(values); // Delega a validação e a gravação para o módulo responsável.
    if (message) setError(message); // Mantém o formulário aberto quando há um problema.
    else onClose(); // Fecha o formulário quando os dados são válidos.
  } // Encerra o tratamento do envio.
  return ( // Retorna a janela de edição escrita em JSX.
    <dialog ref={dialog} className="condo-dialog" aria-labelledby="record-title" onCancel={onClose}>
      {/* Usa um formulário real para oferecer validação e envio pelo teclado. */}
      <form onSubmit={submit}>
        {/* Explica que a demonstração não deve receber informações pessoais reais. */}
        <span className="condo-eyebrow">APENAS DADOS FICTÍCIOS</span>
        {/* Identifica o formulário para visitantes e leitores de tela. */}
        <h2 id="record-title">{title}</h2>
        {/* Constrói um campo com rótulo para cada propriedade configurada. */}
        <div className="condo-form-grid">{fields.map((field) => (
          // Mantém o rótulo ligado ao campo mesmo quando não há um identificador explícito.
          <label key={field.key}>{field.label}
            {/* Exibe uma lista de opções quando o campo possui opções predefinidas. */}
            {field.options ? <select aria-label={field.label} value={values[field.key] ?? ''} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} required>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea aria-label={field.label} required maxLength={1000} value={values[field.key] ?? ''} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} /> : <input aria-label={field.label} required type={field.type || 'text'} min={field.type === 'number' ? '0.01' : undefined} step={field.type === 'number' ? '0.01' : undefined} maxLength={120} value={values[field.key] ?? ''} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} />}
          </label> // Encerra o rótulo do campo atual.
        ))}</div>
        {/* Anuncia erros de validação sem depender apenas de cor. */}
        {error && <p role="alert" className="condo-error">{error}</p>}
        {/* Oferece ações explícitas para cancelar ou salvar. */}
        <div className="condo-actions"><button className="condo-button condo-secondary" type="button" onClick={onClose}>Cancelar</button><button className="condo-button" type="submit">Salvar registro</button></div>
      </form>
    </dialog> // Encerra o diálogo acessível.
  ); // Encerra o retorno visual.
} // Encerra o componente de formulário.

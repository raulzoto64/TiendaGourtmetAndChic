function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) setSent(false);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step === 1) {
      // First step: collect name, surname, city
      const formDataStep1 = new FormData(e.target as HTMLFormElement);
      const dataStep1 = Object.fromEntries(formDataStep1.entries());
      
      // Store first step data
      setFormData(prev => ({ ...prev, ...dataStep1 }));
      setStep(2);
    } else {
      // Second step: collect email and phone
      const formDataStep2 = new FormData(e.target as HTMLFormElement);
      const dataStep2 = Object.fromEntries(formDataStep2.entries());
      
      // Combine all data and send to HubSpot
      const allData = { ...formData, ...dataStep2 };
      
      fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/52188274/a6c5936a-3866-4253-abf3-0e1e49eceb8c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(allData as Record<string, string>),
        }
      ).then(() => setSent(true));
    }
  };

  if (sent) {
    return (
      <div className="success">
        <span>
          <Icon name="check" />
        </span>
        <p className="eyebrow">Solicitud recibida</p>
        <h2>Te contactamos ya.</h2>
        <p>
          El equipo de Gourmet & Chic te llama de inmediato para cerrar el
          pedido.
        </p>
        <button className="button button--dark" onClick={onClose}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="modal-wrap">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          <Icon name="close" />
        </button>
        {!sent ? (
          <>
            <p className="eyebrow">Atención personalizada</p>
            <h2>Contactar para hacer pedido</h2>
            <p>
              Déjanos tus datos y te llamamos de inmediato para darte los
              detalles y personalizar tu pedido.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="modal__fields">
                {step === 1 ? (
                  <>
                    <label>
                      Nombre
                      <input
                        required
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                      />
                    </label>
                    <label>
                      Apellidos
                      <input
                        required
                        type="text"
                        placeholder="Tus apellidos"
                        value={formData.apellidos || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, apellidos: e.target.value }))}
                      />
                    </label>
                    <label>
                      Ciudad
                      <input
                        required
                        type="text"
                        placeholder="Tu ciudad"
                        value={formData.ciudad || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, ciudad: e.target.value }))}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <label>
                      Correo electrónico
                      <input
                        required
                        type="email"
                        placeholder="nombre@correo.com"
                        value={formData.correo || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, correo: e.target.value }))}
                      />
                    </label>
                    <label>
                      Celular / WhatsApp
                      <input
                        required
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={formData.celular || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, celular: e.target.value }))}
                      />
                    </label>
                  </>
                )}
              </div>
              <button className="button button--red" type="submit">
                Solicitar llamada <Icon name="arrow" />
              </button>
            </form>
          </>
        ) : (
          <div className="success">
            <span>
              <Icon name="check" />
            </span>
            <p className="eyebrow">Solicitud recibida</p>
            <h2>Te contactamos ya.</h2>
            <p>
              El equipo de Gourmet & Chic te llama de inmediato para cerrar el
              pedido.
            </p>
            <button className="button button--dark" onClick={onClose}>
              Volver a la tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
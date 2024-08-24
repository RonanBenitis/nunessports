using NunesSports.Server.Models.Interface;

namespace NunesSports.Server.Models
{
    public class Produto : IId
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
    }
}

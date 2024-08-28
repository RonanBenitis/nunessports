using NunesSports.Models.Interface;
using System.ComponentModel.DataAnnotations;

namespace NunesSports.Models
{
    public class Produto : IId
    {
        public int Id { get; set; }

        [StringLength(10)]
        public string Codigo { get; set; } = string.Empty;

        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Descricao { get; set; } = string.Empty;

        public decimal Preco { get; set; }
    }
}

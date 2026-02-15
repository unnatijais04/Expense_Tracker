// UPDATE EXPENSE
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    // If expense not found
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check ownership
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update expense
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

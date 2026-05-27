package com.workorder.dto;

import jakarta.validation.constraints.NotNull;

public class WorkOrderTaskRequest {

    @NotNull
    private Long workOrderId;

    private String description;

    private Boolean completed;

    private Integer order;

    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public Integer getOrder() { return order; }
    public void setOrder(Integer order) { this.order = order; }
}
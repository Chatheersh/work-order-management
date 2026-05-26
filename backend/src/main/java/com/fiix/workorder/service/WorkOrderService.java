package com.fiix.workorder.service;

import com.fiix.workorder.dto.WorkOrderDto;
import com.fiix.workorder.exception.WorkOrderNotFoundException;
import com.fiix.workorder.model.WorkOrder;
import com.fiix.workorder.model.WorkOrderStatus;
import com.fiix.workorder.repository.WorkOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for work orders.
 * Mapping between entity and DTO lives here to keep controllers thin.
 */
@Service
@Transactional
public class WorkOrderService {

    private final WorkOrderRepository repository;

    public WorkOrderService(WorkOrderRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<WorkOrderDto> findAll() {
        return repository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<WorkOrderDto> findByStatus(WorkOrderStatus status) {
        return repository.findByStatus(status).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkOrderDto findById(Long id) {
        return repository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new WorkOrderNotFoundException(id));
    }

    public WorkOrderDto create(WorkOrderDto dto) {
        WorkOrder entity = toEntity(dto);
        return toDto(repository.save(entity));
    }

    public WorkOrderDto update(Long id, WorkOrderDto dto) {
        WorkOrder existing = repository.findById(id)
                .orElseThrow(() -> new WorkOrderNotFoundException(id));
        applyUpdates(existing, dto);
        return toDto(repository.save(existing));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new WorkOrderNotFoundException(id);
        }
        repository.deleteById(id);
    }

    // --- Mapping helpers ---

    private WorkOrderDto toDto(WorkOrder entity) {
        WorkOrderDto dto = new WorkOrderDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());
        dto.setPriority(entity.getPriority());
        dto.setAssignee(entity.getAssignee());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private WorkOrder toEntity(WorkOrderDto dto) {
        WorkOrder entity = new WorkOrder();
        applyUpdates(entity, dto);
        return entity;
    }

    private void applyUpdates(WorkOrder entity, WorkOrderDto dto) {
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : entity.getStatus());
        entity.setPriority(dto.getPriority() != null ? dto.getPriority() : entity.getPriority());
        entity.setAssignee(dto.getAssignee());
    }
}

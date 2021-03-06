
module Rearview
  class MetricsValidatorService
    class MetricsValidatorServiceError < StandardError; end;
    include Celluloid
    include Rearview::Logger
    def started?
      @started
    end
    def startup
      logger.info "#{self} starting up service..."
      raise MetricsValidatorServiceError.new("service already started") if started?
      @task = Rearview::MetricsValidatorTask.supervise(Rearview.config.metrics_validator_schedule)
      @started = true
    end
    def shutdown
      logger.info "#{self} shutting down service..."
      raise MetricsValidatorServiceError.new("service not started") unless started?
      @task.actors.first.terminate
      @started = false
    end
  end
end

